import PocketBase from 'pocketbase';

const db = new PocketBase("http://127.0.0.1:8090/");

export async function getOffres() {
    try {
        let data = await db.collection('Maisons').getFullList({
            sort: '-created',
        });
        data = data.map((maison) => {
            maison.image_url = db.files.getURL(maison, maison.images);
            return maison;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}


export async function getOffre(id) {
    try {
        let data = await db.collection('Maisons').getOne(id);
        data.imageUrl = db.files.getURL(data, data.image);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}

export async function addOffre(house) {
    try {
        await db.collection('Maisons').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}

export async function filterByPrix(prixMin, prixMax) {
    try {
        let data = await pb.collection('Maisons').getFullList({
            sort: '-created',
            filter: `prix >= ${prixMin} && prix <= ${prixMax}`
        });
        data = data.map((Maisons) => {
            Maisons.imageUrl = pb.files.getFileURL(Maisons, Maisons.images);
            return Maisons;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en filtrant la liste des maisons', error);
        return [];
    }
}