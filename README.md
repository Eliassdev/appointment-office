![alt text](./src/assets/logo.png)

# Appointment-Office
Aplicacion para las organizaciones que brindan servicios operando en **Appointment**

## Glosario
- [Primeros Pasos](#primeros-pasos)
- [Entorno de desarrollo](#entorno-de-desarrollo)
- [Git-Flow](#git-flow)
- Estructura

<br/>
<hr/>
<br/>

# Primeros Pasos

1 - Clonar el repositorio desde la URL: https://github.com/Appointment-Army/appointment-office.
```bash
git clone https://github.com/Appointment-Army/appointment-office
```
<br/>
2 - Añadir un repositorio remoto al que sincronizar los cambios.

```bash
git remote add origin https://github.com/Appointment-Army/appointment-office
```
<br/>

# Entorno de Desarrollo
Vite.js no tiene compatibilidad con dotenv para manejo de variables de entorno, pero tiene su propio sistema para gestionar los mismo. En la carpeta root de nuestro proyecto, crearemos un archivo con el nombre **.env.local**
<p>Este mismo es el que alojara las variables de entorno, que deben empezar como un "VITE" como prefijo de la misma. Ejemplo:</p>

<br/>

```
VITE_BASE_URL=http://localhost:3001
```
Estas variables seran accesibles de cualquier lugar de la aplicacion creada con Vite nombrandola en el codigo de la siguiente manera.
```javascript
const url = import.meta.env.VITE_BASE_URL
```
La primera variable que declaremos aca sera la url base que utilizaremos para configurar axios mas adelante. El equipo de backend proveera la url correcta.
Ejemplo:
```javascript
import {axios} from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3001 '
```
<br/>

# Git-Flow

- [Introduccion](##intro)
- [Mantener actulizado el repositorio](#pulleando-branches)
- [Combinando tu brach con development](#merge)

## Intro

Tendras a disposicion como desarrollador **3 ramas** que te interesen:
<br>
- Main: La rama del producto final, la del deploy y la que tiene la version definitiva de la aplicacion.
- Development: Esta sera la rama de "Testing", seria la version en la se iran acoplando lo cambios que cada dev haga en el proyecto.
- devnombredeldev: Esta es la rama en la que vas a trabajar particularmente, la que es tu responsabilidad y la que usaremos para no intervenir en el flujo de la app de development.

Es importante entender que no trabajamos en development directamente para poder mantener un flujo de trabajo asincrono,y evitar generar conflictos frecuentemente en las ramas principales (**development** y **main**).

## Pulleando branches

Para evitar los dichos conflictos a la hora de combinar (mergear) las ramas, deberas frecuentemente pararte en la rama development, "pullear" los cambios que existan, y luego mergearlos a tu rama de desarrollo. La secuencia de comandos serian la siguiente (la secuencia es tomando en cuenta que estas parado en tu rama de desarrollo):

```bash
git checkout development
git pull
git checkout devturama
git merge development
```
**NOTA**: En PowerShell podes encadenar los comandos con ";", mientras que en Linux/Ubuntu puedes usar el operador "&&".

## Merge 

Una vez hayas terminado una feature, y quieras agregarla a la branch development, deberas primero guardar tus commit en el el repositorio remoto de tu rama.
<br>
```bash
git add .
git commit -m "Mensaje del commit"
git push
```
NOTA: Es probable que en esta etapa surjan conflictos. No te asustes, es comun, aunque tendremos que resolverlos con cuidado. Mas adelante llegaremos a la resolucion de conflictos.

**IMPORTANTE: Antes de mergear tus cambios a development, asegurate de que tengas la ultima version de development ya "mergeada" en tu rama. Revisar: [Mantener actulizado el repositorio](#pulleando-branches).**

Una vez tus cambios ya esten subidos, muevete a la rama development y mergea tus cambios con los siguientes comandos.
```bash
git merge devturama //El comando "merge" hace un commit por default
git push
```





