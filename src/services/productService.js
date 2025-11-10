import { db } from "@/utility/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const shoppingListCollection = collection(db, "indkoebsliste");

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
};
