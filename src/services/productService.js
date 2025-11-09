import { db } from "@/utility/firebaseConfig";
// import { collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const shoppingListCollection = collection(db, "indkoebsliste");
const productsCollection = collection(db, "Products");
// const shoppingAllProducts = collection(db, "Products"); Marta requested

export default {
  async getShoppingList() {
    const snapshot = await getDocs(shoppingListCollection);

    return snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
  },
  async getProductDetailAgainstProductDocumentReference(productId) {
    const productDocRef = doc(db, "Products", productId);
    const productSnapshot = await getDoc(productDocRef);
    if (productSnapshot.exists()) {
      const data = productSnapshot.data();
      console.log("Data in getProductCO2: ", data);

      return {
        prodName: data.prodName || "Unknown Product",
        co2_per_kg: data.co2_per_kg || 0,
      };
    }
  },

  /* Marta requested
  async getAllProductsFromProductsTable() {
    const snapshot = await getDocs(shoppingAllProducts);

    return snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
  },
  */
};
