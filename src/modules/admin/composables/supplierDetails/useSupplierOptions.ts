// composables/useSupplierOptions.ts
export const useSupplierOptions = () => {
    const statusOptions = [
        { label: "Ativo", value: "active" },
        { label: "Inativo", value: "inactive" },
    ];

    return {
        statusOptions,
    };
};
