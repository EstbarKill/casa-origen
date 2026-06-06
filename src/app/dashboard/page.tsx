
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Edit, Calendar, Clock, Utensils, Settings, LayoutDashboard, LogOut } from 'lucide-react';
import { MENU_ITEMS as initialMenu } from '@/lib/menu-data';

export default function DashboardPage() {
  const [menuItems, setMenuItems] = useState(initialMenu);
  const [activeTab, setActiveTab] = useState('menu');
  const { toast } = useToast();

  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    category: 'Seafood',
    description: ''
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const item = {
      id: Date.now(),
      name: newItem.name,
      price: Number(newItem.price),
      category: newItem.category,
      description: newItem.description,
      image: 'https://picsum.photos/seed/new-dish/600/600',
      tags: [],
      ingredients: [],
      culturalStory: '',
      preparation: '',
      prepTime: '20 min',
      rating: 5,
      pairings: [],
      fullDescription: ''
    } as any;

    setMenuItems([...menuItems, item]);
    setNewItem({ name: '', price: '', category: 'Seafood', description: '' });
    toast({ title: "Plato añadido", description: "El menú ha sido actualizado correctamente." });
  };

  const removeItem = (id: number) => {
    setMenuItems(menuItems.filter(i => i.id !== id));
    toast({ title: "Plato eliminado", description: "Se ha removido el elemento del menú." });
  };

  return (
    <div className="min-h-screen bg-secondary/5 pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="space-y-4">
            <Badge className="bg-primary/10 text-primary border-none">Administración</Badge>
            <h1 className="text-6xl font-headline font-bold tracking-tighter">Panel de Control</h1>
            <p className="text-foreground/40 italic">Gestiona la esencia de Casa Origen</p>
          </div>
          <div className="flex gap-4">
             <Button variant="outline" className="rounded-full px-8 h-12 border-muted hover:bg-white">Ver Sitio</Button>
             <Button className="rounded-full px-8 h-12 bg-foreground text-white"><LogOut size={18} className="mr-2" /> Salir</Button>
          </div>
        </div>

        <Tabs defaultValue="menu" className="space-y-12" onValueChange={setActiveTab}>
          <TabsList className="bg-white p-2 rounded-full h-16 shadow-lg border w-fit mx-auto md:mx-0 flex">
            <TabsTrigger value="menu" className="rounded-full px-10 data-[state=active]:bg-primary data-[state=active]:text-white h-full transition-all flex gap-2">
              <Utensils size={18} /> Menú
            </TabsTrigger>
            <TabsTrigger value="reservations" className="rounded-full px-10 data-[state=active]:bg-primary data-[state=active]:text-white h-full transition-all flex gap-2">
              <Calendar size={18} /> Reservas
            </TabsTrigger>
            <TabsTrigger value="settings" className="rounded-full px-10 data-[state=active]:bg-primary data-[state=active]:text-white h-full transition-all flex gap-2">
              <Settings size={18} /> Horarios
            </TabsTrigger>
          </TabsList>

          {/* MENU MANAGEMENT */}
          <TabsContent value="menu" className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Form Add */}
              <Card className="rounded-[3rem] shadow-xl border-none">
                <CardHeader className="p-10 border-b">
                  <CardTitle className="text-3xl font-headline font-bold">Añadir Plato</CardTitle>
                  <CardDescription>Crea un nuevo relato gastronómico</CardDescription>
                </CardHeader>
                <CardContent className="p-10">
                  <form onSubmit={handleAddItem} className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Nombre</Label>
                      <Input 
                        value={newItem.name} 
                        onChange={(e) => setNewItem({...newItem, name: e.target.value})} 
                        className="rounded-2xl h-12 bg-secondary/5 border-none"
                        required 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Precio</Label>
                        <Input 
                          type="number" 
                          value={newItem.price} 
                          onChange={(e) => setNewItem({...newItem, price: e.target.value})} 
                          className="rounded-2xl h-12 bg-secondary/5 border-none"
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Categoría</Label>
                        <Input 
                          value={newItem.category} 
                          onChange={(e) => setNewItem({...newItem, category: e.target.value})} 
                          className="rounded-2xl h-12 bg-secondary/5 border-none"
                          required 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Descripción</Label>
                      <Textarea 
                        value={newItem.description} 
                        onChange={(e) => setNewItem({...newItem, description: e.target.value})} 
                        className="rounded-2xl min-h-[100px] bg-secondary/5 border-none"
                        required 
                      />
                    </div>
                    <Button type="submit" className="w-full h-16 rounded-2xl bg-primary text-white text-lg font-bold shadow-xl">
                       <Plus className="mr-2" /> Agregar al Menú
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Menu List */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-[3rem] shadow-xl border-none overflow-hidden">
                  <Table>
                    <TableHeader className="bg-secondary/5 h-16">
                      <TableRow>
                        <TableHead className="pl-10 font-black uppercase text-[10px] tracking-widest">Plato</TableHead>
                        <TableHead className="font-black uppercase text-[10px] tracking-widest">Categoría</TableHead>
                        <TableHead className="font-black uppercase text-[10px] tracking-widest">Precio</TableHead>
                        <TableHead className="pr-10 text-right font-black uppercase text-[10px] tracking-widest">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {menuItems.map(item => (
                        <TableRow key={item.id} className="h-24 hover:bg-secondary/5 transition-colors">
                          <TableCell className="pl-10">
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center font-bold text-primary">CO</div>
                               <span className="font-bold">{item.name}</span>
                            </div>
                          </TableCell>
                          <TableCell><Badge variant="outline">{item.category}</Badge></TableCell>
                          <TableCell className="font-bold text-primary">${item.price.toLocaleString()}</TableCell>
                          <TableCell className="pr-10 text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="rounded-full text-foreground/40 hover:text-primary"><Edit size={18} /></Button>
                              <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="rounded-full text-foreground/40 hover:text-destructive"><Trash2 size={18} /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* SETTINGS MANAGEMENT */}
          <TabsContent value="settings" className="animate-in fade-in slide-in-from-bottom-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <Card className="rounded-[3rem] shadow-xl border-none">
                   <CardHeader className="p-10 border-b">
                      <CardTitle className="text-3xl font-headline font-bold">Horarios de Servicio</CardTitle>
                      <CardDescription>Configura disponibilidad diaria</CardDescription>
                   </CardHeader>
                   <CardContent className="p-10 space-y-8">
                      {['Lunes - Jueves', 'Viernes - Sábado', 'Domingo'].map(day => (
                        <div key={day} className="flex items-center justify-between">
                           <span className="font-bold">{day}</span>
                           <div className="flex gap-4">
                              <Input defaultValue="11:00 AM" className="w-32 rounded-xl bg-secondary/5 border-none h-12" />
                              <Input defaultValue="10:00 PM" className="w-32 rounded-xl bg-secondary/5 border-none h-12" />
                           </div>
                        </div>
                      ))}
                      <Button className="w-full h-16 rounded-2xl bg-foreground text-white mt-8">Guardar Horarios</Button>
                   </CardContent>
                </Card>

                <Card className="rounded-[3rem] shadow-xl border-none bg-primary text-white">
                   <CardHeader className="p-10">
                      <CardTitle className="text-3xl font-headline font-bold">Estado del Restaurante</CardTitle>
                      <CardDescription className="text-white/60">Control de apertura inmediata</CardDescription>
                   </CardHeader>
                   <CardContent className="p-10 space-y-6">
                      <div className="flex items-center justify-between p-6 bg-white/10 rounded-3xl border border-white/20">
                         <div className="space-y-1">
                            <p className="font-bold text-xl">Recibir Reservas</p>
                            <p className="text-xs text-white/50">Permitir nuevas solicitudes</p>
                         </div>
                         <div className="w-16 h-8 bg-white rounded-full relative"><div className="absolute right-1 top-1 w-6 h-6 bg-primary rounded-full" /></div>
                      </div>
                      <div className="flex items-center justify-between p-6 bg-white/10 rounded-3xl border border-white/20">
                         <div className="space-y-1">
                            <p className="font-bold text-xl">Menú Activo</p>
                            <p className="text-xs text-white/50">Visibilidad pública del menú</p>
                         </div>
                         <div className="w-16 h-8 bg-white rounded-full relative"><div className="absolute right-1 top-1 w-6 h-6 bg-primary rounded-full" /></div>
                      </div>
                   </CardContent>
                </Card>
             </div>
          </TabsContent>

          {/* PLACEHOLDER RESERVATIONS */}
          <TabsContent value="reservations" className="animate-in fade-in slide-in-from-bottom-4">
             <div className="bg-white rounded-[3rem] shadow-xl border-none p-12 text-center space-y-6">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                   <LayoutDashboard size={40} />
                </div>
                <h3 className="text-4xl font-headline font-bold">Historial de Reservas</h3>
                <p className="text-foreground/40 italic max-w-xl mx-auto">Esta sección se sincronizará automáticamente con las solicitudes de WhatsApp que se confirmen en el sistema.</p>
                <Button className="rounded-full px-12 h-14 bg-primary">Descargar Reporte</Button>
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
