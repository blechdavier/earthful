import type { Actions } from '@sveltejs/kit'
import { getApiItems, type ApiItem } from '$lib/server/api'

function compareByQuantity(a, b) {
    if (a.quantity > b.quantity) {
        return -1;
    }
    if (a.quantity < b.quantity) {
        return 1;
    }
    return 0;
}

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const analysis = formData.get('action') === 'analysis';

        const lte = formData.get('lte') === '' ? new Date() : new Date(formData.get('lte'));
        const gte = formData.get('gte') === '' ? new Date(0) : new Date(formData.get('gte'));


        if (analysis) {
            let apiItems = getApiItems(lte, gte);

            // these two properties are the ones that actually matter
            let masterMaterials: { [key: string]: number } = {}
            let masterItemNames: { [key: string]: number } = {}
            let debrisQuantity = 0

            for (const item of apiItems) {
                let {
                    master_item_name, master_material, quantity
                } = item;
                if (master_material) {
                    if (masterMaterials[master_material]) {
                        masterMaterials[master_material] += quantity;
                    } else {
                        masterMaterials[master_material] = quantity
                    }
                }
                if (master_item_name) {
                    if (masterItemNames[master_item_name]) {
                        masterItemNames[master_item_name] += quantity;
                    } else {
                        masterItemNames[master_item_name] = quantity
                    }
                }
                debrisQuantity += quantity
            }
            const response = {
                masterMaterials: Object.keys(masterMaterials).map((master_material) => {
                    return {
                        master_material,
                        quantity: masterMaterials[master_material]
                    }
                }
                ).sort(compareByQuantity),
                masterItemNames: Object.keys(masterItemNames).map((master_item_name) => {
                    return {
                        master_item_name,
                        quantity: masterItemNames[master_item_name]
                    }
                }
                ).sort(compareByQuantity),
                debrisQuantity
            }
            return response;
        } else {
            let response: ApiItem[] = [];
            for (const page in pages) {
                console.log(`${pages[page].data.length} results on page ${page}`)
                response = response.concat(pages[page].data)
            }
            console.log(`returning ${response.length} results`)
            return response;
        }
    }
}