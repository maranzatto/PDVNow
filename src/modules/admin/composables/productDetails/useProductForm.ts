// composables/useProductForm.ts
import { ref, computed } from "vue";
import type { ProductForm, ProductErrors } from "@/modules/admin/types/productDetails/productType";

export const useProductForm = () => {
    const form = ref<ProductForm>({
        name: "",
        sku: "",
        barcode: "",
        category: "",
        status: "active",
        salePrice: 0,
        costPrice: 0,
        profitMargin: 0,
        allowDiscount: true,
        minPrice: 0,
        saleUnit: "un",
        stockControl: true,
        stock: 0,
        minStock: 0,
        maxStock: 0,
        location: "",
        lastMovement: null,
        ncm: "",
        cfop: "",
        cst: "",
        origin: "0",
        icmsRate: 0,
        pisRate: 0,
        cofinsRate: 0,
        taxSituation: "tributado",
        hasTaxSubstitution: false,
        supplier: "",
        supplierCode: "",
        purchaseCost: 0,
        replenishmentTime: 0,
        lastPurchaseDate: null,
        lastPurchaseValue: 0,
        weight: 0,
        height: 0,
        width: 0,
        depth: 0,
        brand: "",
        model: "",
        batch: "",
        expirationDate: null,
        serial: "",
        fractional: false,
        saleByWeight: false,
        promotional: false,
        promotionalPrice: 0,
        promotionStart: null,
        promotionEnd: null,
        isKit: false,
        allowSaleWithoutStock: false,
        erpCode: "",
        accountingCode: "",
        syncEcommerce: false,
        image: "",
        notes: "",
    });

    const errors = ref<ProductErrors>({});

    const finalPrice = computed(() => {
        if (form.value.costPrice <= 0) return 0;
        return Number((form.value.costPrice * (1 + form.value.profitMargin / 100)).toFixed(2));
    });

    const profitMarginPercent = computed(() => {
        if (form.value.costPrice <= 0 || form.value.salePrice <= 0) return 0;
        return Number((((form.value.salePrice - form.value.costPrice) / form.value.costPrice) * 100).toFixed(2));
    });

    const loadProduct = (productData: Partial<ProductForm>) => {
        form.value = { ...form.value, ...productData };
    };

    const resetForm = () => {
        form.value = {
            name: "",
            sku: "",
            barcode: "",
            category: "",
            status: "active",
            salePrice: 0,
            costPrice: 0,
            profitMargin: 0,
            allowDiscount: true,
            minPrice: 0,
            saleUnit: "un",
            stockControl: true,
            stock: 0,
            minStock: 0,
            maxStock: 0,
            location: "",
            lastMovement: null,
            ncm: "",
            cfop: "",
            cst: "",
            origin: "0",
            icmsRate: 0,
            pisRate: 0,
            cofinsRate: 0,
            taxSituation: "tributado",
            hasTaxSubstitution: false,
            supplier: "",
            supplierCode: "",
            purchaseCost: 0,
            replenishmentTime: 0,
            lastPurchaseDate: null,
            lastPurchaseValue: 0,
            weight: 0,
            height: 0,
            width: 0,
            depth: 0,
            brand: "",
            model: "",
            batch: "",
            expirationDate: null,
            serial: "",
            fractional: false,
            saleByWeight: false,
            promotional: false,
            promotionalPrice: 0,
            promotionStart: null,
            promotionEnd: null,
            isKit: false,
            allowSaleWithoutStock: false,
            erpCode: "",
            accountingCode: "",
            syncEcommerce: false,
            image: "",
            notes: "",
        };
        errors.value = {};
    };

    return {
        form,
        errors,
        finalPrice,
        profitMarginPercent,
        loadProduct,
        resetForm,
    };
};
