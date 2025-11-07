#EJERCICIO PANES
print ("============== PANADERIA DON PACHO ==============")

precio_pan= 300

panes = int(input("ingrese cantidad de panes: "))

tasa_descuento = 0.00

if panes < 0:
    print("ERROR: Cantidad invalida")

else:
    if panes >50:
        tasa_descuento =0.20
    
    elif panes >20:
        tasa_descuento=0.10

        precio_base = panes * precio_pan
        precio_final = precio_base * (1 - tasa_descuento)

        print(f"Descuento aplicado: {tasa_descuento *100:}%")
        print(f"Precio final a pagar: ${precio_final:}")







