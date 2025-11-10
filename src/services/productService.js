import { db } from "@/utility/firebaseConfig";
// import { collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const shoppingListCollection = collection(db, "indkoebsliste");
const productsListCollection = collection(db, "Products");

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
  async getProductsList() {
    const snapshot = await getDocs(productsListCollection);

    return snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
  },
};
