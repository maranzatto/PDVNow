// composables/useProductOptions.ts
export const useProductOptions = () => {
    const categories = ["Eletrônicos", "Informática", "Periféricos", "Armazenamento", "Áudio", "Vídeo", "Rede", "Acessórios", "Mobiliário", "Cabos"]
        .map(cat => ({
            label: cat,
            value: cat.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        }));

    const statusOptions = [
        { label: "Ativo", value: "active" },
        { label: "Inativo", value: "inactive" },
        { label: "Disponível", value: "available" },
        { label: "Fora de Estoque", value: "out_of_stock" },
    ];

    const saleUnitOptions = [
        { label: "Unidade", value: "un" },
        { label: "Quilograma", value: "kg" },
        { label: "Litro", value: "lt" },
        { label: "Caixa", value: "cx" },
        { label: "Metro", value: "m" },
        { label: "Pacote", value: "pct" },
    ];

    const originOptions = [
        { label: "0 - Nacional", value: "0" },
        { label: "1 - Estrangeira (importação direta)", value: "1" },
        { label: "2 - Estrangeira (adquirida no mercado interno)", value: "2" },
        { label: "3 - Nacional com mais de 40% de conteúdo estrangeiro", value: "3" },
    ];

    const taxSituationOptions = [
        { label: "Tributado", value: "tributado" },
        { label: "Isento", value: "isento" },
        { label: "Monofásico", value: "monofasico" },
        { label: "Substituição Tributária", value: "st" },
    ];

    return {
        categories,
        statusOptions,
        saleUnitOptions,
        originOptions,
        taxSituationOptions,
    };
};
