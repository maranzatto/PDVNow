import { ref, computed, type Ref } from 'vue';

export interface Product {
    id: string;
    barcode: string;
    name: string;
    price: number;
}

export interface CartItem extends Product {
    quantity: number;
    discount: number;
}

export function usePDV() {
    // Mock products database
    const products = ref<Product[]>([
        // Bebidas
        { id: '1', barcode: '7891000053508', name: 'Coca-Cola 2L', price: 8.99 },
        { id: '2', barcode: '7891000100103', name: 'Pepsi 2L', price: 7.99 },
        { id: '3', barcode: '7891000035090', name: 'Guaraná Antarctica 2L', price: 7.49 },
        { id: '4', barcode: '7891999010856', name: 'Água Mineral 500ml', price: 2.50 },
        { id: '5', barcode: '7891000140307', name: 'Fanta Laranja 2L', price: 7.99 },
        { id: '6', barcode: '7891000064277', name: 'Sukita 2L', price: 7.29 },
        { id: '7', barcode: '7891999100107', name: 'Suco de Laranja 1L', price: 6.90 },

        // Laticínios
        { id: '8', barcode: '7894000051527', name: 'Leite Integral 1L', price: 4.99 },
        { id: '9', barcode: '7896006714235', name: 'Queijo Mussarela 500g', price: 24.90 },
        { id: '10', barcode: '7896006714242', name: 'Manteiga 200g', price: 8.50 },
        { id: '11', barcode: '7896006714259', name: 'Iogurte Natural 170g', price: 3.25 },

        // Padaria
        { id: '12', barcode: '7891000055519', name: 'Pão Francês', price: 0.50 },
        { id: '13', barcode: '7891000055526', name: 'Pão de Forma 500g', price: 8.90 },
        { id: '14', barcode: '7891000055533', name: 'Bolo de Chocolate', price: 12.90 },

        // Limpeza
        { id: '15', barcode: '7891024113105', name: 'Sabão em Pó 1kg', price: 15.90 },
        { id: '16', barcode: '7891024113112', name: 'Amaciante 2L', price: 12.50 },
        { id: '17', barcode: '7891024113129', name: 'Desinfetante 1L', price: 6.90 },

        // Higiene Pessoal
        { id: '18', barcode: '7891024113136', name: 'Sabonete', price: 2.50 },
        { id: '19', barcode: '7891024113143', name: 'Pasta de Dente 90g', price: 4.90 },
        { id: '20', barcode: '7891024113150', name: 'Shampoo 350ml', price: 14.90 },

        // Mercearia
        { id: '21', barcode: '7891000055540', name: 'Arroz 5kg', price: 22.90 },
        { id: '22', barcode: '7891000055557', name: 'Feijão 1kg', price: 8.90 },
        { id: '23', barcode: '7891000055564', name: 'Açúcar 5kg', price: 15.90 },
        { id: '24', barcode: '7891000055571', name: 'Café 500g', price: 12.90 },
    ]);

    // Add some initial items to cart for testing
    const cart = ref<CartItem[]>([
        { id: '1', barcode: '7891000053508', name: 'Coca-Cola 2L', price: 8.99, quantity: 2, discount: 0 },
        { id: '12', barcode: '7891000055519', name: 'Pão Francês', price: 0.50, quantity: 10, discount: 0 },
        { id: '21', barcode: '7891000055540', name: 'Arroz 5kg', price: 22.90, quantity: 1, discount: 0 },
    ]);
    const barcodeInput = ref('');
    const errorMessage = ref('');
    const successMessage = ref('');

    const subtotal = computed(() => {
        return cart.value.reduce((sum, item) => {
            return sum + (item.price * item.quantity) - item.discount;
        }, 0);
    });

    const totalItems = computed(() => {
        return cart.value.reduce((sum, item) => sum + item.quantity, 0);
    });

    const handleKeyNavigation = (e: KeyboardEvent, selectedIndex: Ref<number>, cart: Ref<CartItem[]>) => {
        if (selectedIndex.value < 0 || selectedIndex.value >= cart.value.length) return;
        const item = cart.value[selectedIndex.value];
        if (!item) return;
        switch (e.key) {
            case 'F2':
                e.preventDefault();
                removeItem(item.barcode);
                if (selectedIndex.value > 0) selectedIndex.value--;
                break;
            case 'F4':
                e.preventDefault();
                return { type: 'discount', item };
            case 'ArrowUp':
                if (selectedIndex.value > 0) {
                    e.preventDefault();
                    selectedIndex.value--;
                }
                break;
            case 'ArrowDown':
                if (selectedIndex.value < cart.value.length - 1) {
                    e.preventDefault();
                    selectedIndex.value++;
                }
                break;
        }
        return null;
    };

    function findProductByBarcode(barcode: string): Product | undefined {
        return products.value.find(p => p.barcode === barcode);
    }

    function addToCart(barcode: string): boolean {
        const product = findProductByBarcode(barcode);

        if (!product) {
            errorMessage.value = 'Produto não encontrado';
            setTimeout(() => { errorMessage.value = ''; }, 3000);
            return false;
        }

        const existingItemIndex = cart.value.findIndex(item => item.barcode === barcode);

        if (existingItemIndex >= 0 && cart.value[existingItemIndex]) {
            // Update quantity if product already in cart
            cart.value[existingItemIndex].quantity += 1;
        } else {
            // Add new item to cart
            cart.value.push({
                ...product,
                quantity: 1,
                discount: 0
            });
        }

        successMessage.value = `${product.name} adicionado ao carrinho`;
        setTimeout(() => { successMessage.value = ''; }, 2000);
        return true;
    }

    function removeItem(barcode: string): void {
        cart.value = cart.value.filter(item => item.barcode !== barcode);
    }

    function updateQuantity(barcode: string, newQuantity: number): void {
        const item = cart.value.find(item => item.barcode === barcode);
        if (item) {
            item.quantity = Math.max(1, newQuantity);
        }
    }

    function applyDiscount(barcode: string, discountValue: number): void {
        const item = cart.value.find(item => item.barcode === barcode);
        if (item) {
            item.discount = Math.min(item.price * item.quantity, Math.max(0, discountValue));
        }
    }

    function clearCart(): void {
        cart.value = [];
    }

    function processBarcodeInput(): void {
        if (!barcodeInput.value.trim()) return;

        addToCart(barcodeInput.value.trim());
        barcodeInput.value = '';
    }

    // Handle barcode scanner input (rapid entry)
    function handleBarcodeInput(event: KeyboardEvent): void {
        // If Enter is pressed, process the barcode
        if (event.key === 'Enter' && barcodeInput.value) {
            processBarcodeInput();
        }
    }

    return {
        // State
        cart,
        barcodeInput,
        errorMessage,
        successMessage,

        // Computed
        subtotal,
        totalItems,

        // Methods
        addToCart,
        removeItem,
        updateQuantity,
        applyDiscount,
        clearCart,
        processBarcodeInput,
        handleBarcodeInput,
        handleKeyNavigation
    };
}
