print ("=== HELADERIA FROSTY ===")
PRECIO_CHOCOLATE = 4000
PRECIO_VAINILLA = 3500
PRECIO_TOPPING = 1000
sabor = input ("*Ingrese sabor (Chocolate/Vainilla): "). lower ()
precio_base = 0
total_a_pagar = 0
if sabor != "chocolate" and sabor != "vainilla":
    print("Sabor no disponible")
else:
    if sabor == "chocolate":
        precio_base = PRECIO_CHOCOLATE
    else:
        precio_base = PRECIO_VAINILLA

    opcion_topping = input("Desea agregar topping? S/N") .lower 

if opcion_topping == "si" :
    total_a_pagar = precio_base + PRECIO_TOPPING
else:
    print(f"Topping agregado: {PRECIO_TOPPING:}")
    total_a_pagar = precio_base
    print("-" * 30)
    print(f"Sabor elegido: {sabor}")
    print(f"precio Base: {precio_base:}")
    
    


