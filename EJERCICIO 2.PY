#EJERCICIO CINE
print("=============CINE LA ESTRELLA============")
precio_boleta4= 0
precio_boleta5_11 = 5000
Precio_boleta12_59= 8000
precio_boleta60=4000


edad= int(input("Ingrese su edad:"))
  
if edad >= 60 :
    print(f"El precio de su boleta es:{precio_boleta60}")
elif edad >11 and edad<= 59 : 
    print(f"El precio de su boleta es: {Precio_boleta12_59}")
elif edad >=5 and edad<=11:
     print(f"El precio de su boleta es: {precio_boleta5_11}")
else:
    print("error numero no valido")
            
