
import { useState } from "react";
import Header from "@/components/Header";
import ProductForm from "@/components/ProductForm";
import BatchProductForm from "@/components/BatchProductForm";
import ProductList from "@/components/ProductList";
import { Product, ProductFormData } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState("produtos");
  const { toast } = useToast();

  function handleAddProduct(productData: ProductFormData) {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setProducts(prev => [newProduct, ...prev]);
    setActiveTab("produtos");
  }

  const handleAddBatchProducts = (batchProducts: ProductFormData[]) => {
    const newProducts: Product[] = batchProducts.map(product => ({
      ...product,
      id: `prod-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    setProducts(prev => [...newProducts, ...prev]);
    setActiveTab("produtos");
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
    toast({
      title: "Produto removido",
      description: "O produto foi removido com sucesso."
    });
  };

  const handleEditProduct = (product: Product) => {
    toast({
      title: "Editar produto",
      description: `Funcionalidade de edição para ${product.name} será implementada em breve.`
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="produtos">Produtos</TabsTrigger>
            <TabsTrigger value="cadastrar">Cadastro Manual</TabsTrigger>
            <TabsTrigger value="cadastro-massa">Cadastro em Massa</TabsTrigger>
          </TabsList>
          
          <TabsContent value="produtos" className="animate-fade-in">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Lista de Produtos</h2>
                <div className="space-x-2">
                  <Button onClick={() => setActiveTab("cadastrar")} variant="outline">
                    Cadastro Manual
                  </Button>
                  <Button onClick={() => setActiveTab("cadastro-massa")} variant="outline">
                    CADASTRO EM MASSA
                  </Button>
                </div>
              </div>
              
              <ProductList 
                products={products}
                onEditProduct={handleEditProduct}
                onDeleteProduct={handleDeleteProduct}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="cadastrar" className="animate-fade-in">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Cadastro Manual de Produto</h2>
              <p className="text-muted-foreground">
                Preencha os campos abaixo para cadastrar um novo produto no sistema.
              </p>
              
              <ProductForm onSubmit={handleAddProduct} />
            </div>
          </TabsContent>
          
          <TabsContent value="cadastro-massa" className="animate-fade-in">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Cadastro em Massa</h2>
              <p className="text-muted-foreground">
                Cadastre até 10 produtos de uma vez preenchendo a planilha abaixo.
              </p>
              
              <BatchProductForm onSubmit={handleAddBatchProducts} />
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MarketPlace Industrial. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Index;
