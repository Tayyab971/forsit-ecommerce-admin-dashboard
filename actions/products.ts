import { firestore } from '../plugins/firebase';
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';

export const fetchProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(firestore, "products"));
        const products: any[] = []
        querySnapshot.forEach(doc => {
            products.push({ id: doc.id, ...doc.data() })
        });

        return products;

    } catch (err: any) {

        console.log("Error fetching products:", err.message);
        return [];
    }

};



export const addUpdateProduct = async (product: any) => {
    const { id, ...rest } = product;
    try {
        if (id) {
            // Update existing product
            const productRef = doc(firestore, "products", id);
            await updateDoc(productRef, rest);
        } else {
            // Add new product
            const colRef = collection(firestore, "products");
            await addDoc(colRef, rest);
        }
        return true;
    } catch (err: any) {
        console.error("Error adding/updating product:", err.message);
        return false;
    }
};

export const getCategories = async () => {
    try {
        const querySnapshot = await getDocs(collection(firestore, "categories"));

        const categories: any[] = []
        querySnapshot.forEach(doc => {
            categories.push(doc.data().name)
        });

        return categories;

    } catch (err: any) {
        console.log(err.message)
        return [];
    }
}


export const deleteProduct = async (id: string) => {
    try {
        const productRef = doc(firestore, "products", id);
        await deleteDoc(productRef);
        return true;
    } catch (err: any) {
        console.error("Error deleting product:", err.message);
        return false;
    }
}

