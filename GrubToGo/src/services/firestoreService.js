import { db } from '../firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  getDocs,
  orderBy,
  Timestamp,
  runTransaction
} from 'firebase/firestore';

// ============================================================================
// USER OPERATIONS
// ============================================================================

/**
 * Create a new user document in Firestore
 * @param {string} userId - Firebase Auth UID
 * @param {string} email - User email
 * @param {string} role - "student" or "caterer"
 */
export const createUser = async (userId, email, role) => {
  const userDoc = {
    userId,
    email,
    role
  };

  // Add diningDollars for students
  if (role === 'student') {
    userDoc.diningDollars = 250.00;
  }

  await setDoc(doc(db, 'users', userId), userDoc);
  return userDoc;
};

/**
 * Get user data from Firestore
 * @param {string} userId - Firebase Auth UID
 */
export const getUser = async (userId) => {
  const userDoc = await getDoc(doc(db, 'users', userId));
  if (userDoc.exists()) {
    return userDoc.data();
  }
  return null;
};

/**
 * Update user's dining dollars balance
 * @param {string} userId - Firebase Auth UID
 * @param {number} newBalance - New balance amount
 */
export const updateDiningDollars = async (userId, newBalance) => {
  await updateDoc(doc(db, 'users', userId), {
    diningDollars: newBalance
  });
};

// ============================================================================
// OFFERING OPERATIONS
// ============================================================================

/**
 * Create a new offering
 * @param {object} offeringData - Offering details
 */
export const createOffering = async (offeringData) => {
  const offering = {
    catererId: offeringData.catererId,
    storeId: offeringData.storeId,
    itemName: offeringData.itemName,
    discountType: offeringData.discountType,
    discountValue: offeringData.discountValue,
    createdAt: Timestamp.now(),
    expiresAt: offeringData.expiresAt,
    status: 'active',
    orderId: null,
    purchasedBy: null,
    purchasedAt: null
  };

  const docRef = await addDoc(collection(db, 'offerings'), offering);
  return { id: docRef.id, ...offering };
};

/**
 * Get all active offerings
 */
export const getActiveOfferings = async () => {
  const now = Timestamp.now();
  const q = query(
    collection(db, 'offerings'),
    where('status', '==', 'active'),
    where('expiresAt', '>', now),
    orderBy('expiresAt', 'asc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Get offerings created by a specific caterer
 * @param {string} catererId - Caterer's user ID
 */
export const getCatererOfferings = async (catererId) => {
  const q = query(
    collection(db, 'offerings'),
    where('catererId', '==', catererId),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Mark an offering as sold
 * @param {string} offeringId - Offering document ID
 * @param {string} orderId - Created order ID
 * @param {string} studentId - Student who purchased
 */
export const markOfferingSold = async (offeringId, orderId, studentId) => {
  await updateDoc(doc(db, 'offerings', offeringId), {
    status: 'sold',
    orderId,
    purchasedBy: studentId,
    purchasedAt: Timestamp.now()
  });
};

// ============================================================================
// ORDER OPERATIONS
// ============================================================================

/**
 * Place an order (with transaction to ensure atomicity)
 * @param {object} orderData - Order details
 */
export const placeOrder = async (orderData) => {
  return await runTransaction(db, async (transaction) => {
    // 1. Get offering
    const offeringRef = doc(db, 'offerings', orderData.offeringId);
    const offeringDoc = await transaction.get(offeringRef);
    
    if (!offeringDoc.exists()) {
      throw new Error('Offering not found');
    }

    const offering = offeringDoc.data();
    
    // 2. Check if still active
    if (offering.status !== 'active') {
      throw new Error('This item is no longer available');
    }

    // 3. Check if not expired
    if (offering.expiresAt.toMillis() < Date.now()) {
      throw new Error('This deal has expired');
    }

    // 4. Get student data
    const userRef = doc(db, 'users', orderData.studentId);
    const userDoc = await transaction.get(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }

    const user = userDoc.data();
    
    // 5. Check dining dollars balance
    if (user.diningDollars < orderData.totalAmount) {
      throw new Error(`Insufficient Dining Dollars. Balance: $${user.diningDollars.toFixed(2)}`);
    }

    // 6. Calculate new balance
    const newBalance = user.diningDollars - orderData.totalAmount;

    // 7. Create order document
    const order = {
      studentId: orderData.studentId,
      studentEmail: orderData.studentEmail,
      catererId: offering.catererId,
      offeringId: orderData.offeringId,
      storeId: offering.storeId,
      itemName: offering.itemName,
      totalAmount: orderData.totalAmount,
      studentBalanceBefore: user.diningDollars,
      studentBalanceAfter: newBalance,
      orderedAt: Timestamp.now(),
      pickedUpAt: null,
      orderStatus: 'placed',
      isPickedUp: false
    };

    const orderRef = doc(collection(db, 'orders'));
    transaction.set(orderRef, order);

    // 8. Update student balance
    transaction.update(userRef, {
      diningDollars: newBalance
    });

    // 9. Mark offering as sold
    transaction.update(offeringRef, {
      status: 'sold',
      orderId: orderRef.id,
      purchasedBy: orderData.studentId,
      purchasedAt: Timestamp.now()
    });

    return { orderId: orderRef.id, newBalance, ...order };
  });
};

/**
 * Get student's active orders
 * @param {string} studentId - Student's user ID
 */
export const getActiveOrders = async (studentId) => {
  const q = query(
    collection(db, 'orders'),
    where('studentId', '==', studentId),
    where('isPickedUp', '==', false),
    orderBy('orderedAt', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Get student's past orders
 * @param {string} studentId - Student's user ID
 */
export const getPastOrders = async (studentId) => {
  const q = query(
    collection(db, 'orders'),
    where('studentId', '==', studentId),
    where('isPickedUp', '==', true),
    orderBy('pickedUpAt', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Get all orders (for caterer)
 */
export const getAllOrders = async () => {
  const q = query(
    collection(db, 'orders'),
    orderBy('orderedAt', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Update order status
 * @param {string} orderId - Order document ID
 * @param {string} newStatus - New status value
 */
export const updateOrderStatus = async (orderId, newStatus) => {
  const updates = { orderStatus: newStatus };
  
  // If marking as picked up, set the flags
  if (newStatus === 'picked_up') {
    updates.isPickedUp = true;
    updates.pickedUpAt = Timestamp.now();
  }

  await updateDoc(doc(db, 'orders', orderId), updates);
};
