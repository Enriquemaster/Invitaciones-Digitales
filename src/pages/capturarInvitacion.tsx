import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonButton, IonSelect, IonSelectOption, IonModal, IonFooter } from '@ionic/react';
import { useLocation, useHistory } from 'react-router-dom';
import storageCalendario from './storage/storageCalendario'; // Importa tu configuración de storage
import html2canvas from 'html2canvas';
import { cloudinaryConfig } from '../config/cloudinaryConfig';
import { Swiper, SwiperSlide } from 'swiper/react';
import confetti from "canvas-confetti";
import { BorderBeam } from "@/components/ui/border-beam";
import ShineBorder from "@/components/ui/shine-border";
import SparklesText from "@/components/ui/sparkles-text";
import '@fontsource-variable/dancing-script';
import '@fontsource-variable/cinzel';
import 'swiper/css'; 
import 'swiper/css/pagination'; 
import './css/felizcum.css';
import '../theme/variables.css';
import '@fontsource/luckiest-guy';



interface LocationState {
  responseText: string;
  invitationData: {
    inviteeName: string;
    eventDate: string;
    eventTime: string;
    eventLocation: string;
    eventType: string;
    birthdayName?: string;
    birthdayAge?: string;
    nameperson1?: string;
    nameperson2?: string;
    meetingSubject?: string;
    meetingOrganizer?: string;
    asunto?: string;
    organizador?: string;
  };
}

const CapturarInvitacion: React.FC = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();
  const { responseText, invitationData } = location.state || {}; 
  const {
    inviteeName,
    eventDate,
    eventTime,
    eventLocation,
    eventType,
    birthdayName,
    birthdayAge,
    nameperson1,
    nameperson2,
    meetingSubject,
    meetingOrganizer,
    asunto,
    organizador
  } = invitationData || {}; 

  const [showModal, setShowModal] = useState(false);
  const [textColor, setTextColor] = useState('black'); // Color inicial
  const [fontFamily, setFontFamily] = useState('Arial'); // Fuente inicial
  const [headerTextColor, setHeaderTextColor] = useState('black');
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);



  const captureAsImage = () => {
    const invitationElement = document.getElementById('invitation');
    if (invitationElement) {
      html2canvas(invitationElement).then((canvas) => {
        const imageUrl = canvas.toDataURL();
        history.push({
          pathname: '/CompartirPor',
          state: { imageUrl, responseText, eventType, eventDate,eventTime },
        });
      });
    }
  };

  console.log("Tipo de evento:", eventType);


  const showAllStoredItems = () => {
    const storedItems: { [key: string]: string } = {}; // Para almacenar las claves y valores
    // Recorremos todas las claves del localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        storedItems[key] = localStorage.getItem(key) || ''; // Guardamos la clave y el valor
      }
    }
    console.log('Stored Items:', storedItems); // Muestra los elementos almacenados en la consola
  };

    // Función para manejar el clic en una imagen
    const handleImageClick = (src: string) => {
      setSelectedImage(src);
    };
    
    
  // Rutas de imágenes de niños
  const images = [
    '/images/cumple/felizcum.png',
    '/images/cumple/felizcum1.png',
    '/images/cumple/felizcum2.png',
    '/images/cumple/felizcum3.png',
    '/images/cumple/felizcum4.png',
    '/images/cumple/felizcum5.png'
  ];

  // Rutas de imágenes de adolecentes
  const images1 = [
    '/images/cumple/felizcum6.png',
    '/images/cumple/felizcum7.png',
    '/images/cumple/felizcum8.png',
    '/images/cumple/felizcum9.png',
    '/images/cumple/felizcum10.png',
  ];

    // Rutas de imágenes de formales
    const images2 = [
      '/images/cumple/felizcum.png',
      '/images/cumple/felizcum1.png',
      '/images/cumple/felizcum2.png',
      '/images/cumple/felizcum3.png',
      '/images/cumple/felizcum4.png',
      '/images/cumple/felizcum5.png'
    ];

       // Rutas de imágenes de formales
       const imagesboda = [
        '/images/boda/boda.png',
        '/images/boda/boda1.png',
        '/images/boda/boda2.png',
        '/images/boda/boda3.png',
        '/images/boda/boda4.png',
        '/images/boda/boda5.png',
        
      ];

      // Rutas de imágenes de formales
      const imagesfiesta = [
        '/images/fiesta/fiesta.png',
        '/images/fiesta/fiesta2.png',
        '/images/fiesta/f4.png',
      ];

      const imagesfiesta1 = [
        '/images/fiesta/f5.png',
        '/images/fiesta/f6.png',
        '/images/fiesta/f6.png',
      ];

      const imagesfiesta2 = [
        '/images/fiesta/f3.png',
        '/images/fiesta/f2.png',
        '/images/fiesta/f1.png',
        '/images/fiesta/fiesta1.png',
      ];


       // Rutas de imágenes de formales
       const imagesreuniones = [
        '/images/reuniones/r1.png',
        '/images/reuniones/r2.png',
        '/images/reuniones/r3.png',
        '/images/reuniones/r7.png',
        '/images/reuniones/r8.png',
        '/images/reuniones/r9.png',
        '/images/reuniones/r10.png',
      ];

      const imagesreuniones1 = [
        '/images/reuniones/r4.png',
        '/images/reuniones/r5.png',
        '/images/reuniones/r6.png',
        '/images/reuniones/r11.png',
        '/images/reuniones/r12.png',
        '/images/reuniones/r13.png',
      ];

      const imagesreuniones2 = [
        '/images/reuniones/1.png',
        '/images/reuniones/2.png',
        '/images/reuniones/3.png',
        '/images/reuniones/4.png',
      ];

      const imagesboda1 = [
        '/images/boda/b1.png',
        '/images/boda/b2.png',
        '/images/boda/b3.png',
        '/images/boda/b4.png',
      ];





  const allImages = [...images, ...images1, ...images2, ...imagesboda, ... imagesreuniones, ...imagesreuniones1, ...imagesreuniones2];

  const [selectedImage, setSelectedImage] = useState<string>(allImages[0]);


  const handleConfetti = () => {
    const scalar = 2;
    const triangle = confetti.shapeFromPath({
      path: "M0 10 L5 0 L10 10z",
    });
    const square = confetti.shapeFromPath({
      path: "M0 0 L10 0 L10 10 L0 10 Z",
    });
    const coin = confetti.shapeFromPath({
      path: "M5 0 A5 5 0 1 0 5 10 A5 5 0 1 0 5 0 Z",
    });
    const tree = confetti.shapeFromPath({
      path: "M5 0 L10 10 L0 10 Z",
    });

    const defaults = {
      spread: 360,
      ticks: 60,
      gravity: 0,
      decay: 0.96,
      startVelocity: 20,
      shapes: [triangle, square, coin, tree],
      scalar,
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 30,
      });

      confetti({
        ...defaults,
        particleCount: 5,
      });

      confetti({
        ...defaults,
        particleCount: 15,
        scalar: scalar / 2,
        shapes: ["circle"],
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };



  return (
    <IonPage > 
      <IonHeader>
        <IonToolbar>
          <IonTitle>Compartir Invitación</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >

  
{/* Mostrar solo si el EventType es "cumpleaños" */}

 {/* Título */}
 <h1 className="text-xl font-semibold pt-2 text-center text-black roboto-light">Elija un diseño para su invitación</h1>
{eventType === 'cumpleaños' && (
  <>
    {/* Sección de Carrusel: Para Niños */}
    <div className="mb-6  mt-6 bg-white rounded-xl  px-4 ">
      <SparklesText text="Diseños Infatiles"className="text-2xl text-center font-semibold mb-4 text-black" id="cards-title"/>
      <Swiper
        spaceBetween={15}
        slidesPerView={1.2}
        centeredSlides={true}
        loop={true}
        pagination={{ clickable: true }}
        className="rounded-md px-6"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="pt-4 px-6">
            <img
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-56 object-cover rounded-lg bg-blue-500 rounded transition duration-300 hover:scale-105 p-2"
              onClick={() => handleImageClick(src)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

    {/* Sección de Carrusel: Para Adolescentes */}
    <div className="mb-6  mt-6 bg-white rounded-xl px-4">
    <SparklesText text="Diseños de Pastel"className="text-3xl text-xl text-center font-semibold mb-4 text-black" id="cards-title1"/>
      <Swiper
        spaceBetween={15}
        slidesPerView={1.2}
        centeredSlides={true}
        loop={true}
        pagination={{ clickable: true }}
        className="rounded-md px-6"
      >
        {images1.map((src, index) => (
          <SwiperSlide key={index} className="pt-4 px-6">
            <img
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-56 object-cover rounded-lg bg-blue-500 rounded transition duration-300 hover:scale-105 p-2"
              onClick={() => handleImageClick(src)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

  
  </>
)}



{eventType === 'boda' && (
  <>
    {/* Sección de Carrusel: Para Niños */}
    <div className="mb-6  mt-6 bg-white rounded-xl  px-4 ">
      <SparklesText text="Diseños de Boda"className="text-2xl text-center font-semibold mb-4 text-black" id="cards-title"/>
      <Swiper
  spaceBetween={15} // Espacio entre diapositivas
  slidesPerView={1.2} // Cuántas diapositivas mostrar a la vez (parcialmente visible)
  slidesPerGroup={1} // Cuántas diapositivas avanzar en cada movimiento
  centeredSlides={true} // Centrar la diapositiva activa
  loop={true} // Activar modo bucle
  pagination={{ clickable: true }} // Agregar puntos de paginación
  className="rounded-md px-6"
>
  {imagesboda.map((src, index) => (
    <SwiperSlide key={index} className="pt-4 px-6">
      <img
        src={src}
        alt={`Slide ${index}`}
        className="w-full h-56 object-cover rounded-lg bg-blue-500 rounded transition duration-300 hover:scale-105 p-2"
        onClick={() => handleImageClick(src)}
      />
    </SwiperSlide>
  ))}
</Swiper>
    </div>

    <div className="mb-6  mt-6 bg-white rounded-xl  px-4 ">
      <SparklesText text="Otros Diseños"className="text-2xl text-center font-semibold mb-4 text-black" id="cards-title"/>
      <Swiper
  spaceBetween={15} // Espacio entre diapositivas
  slidesPerView={1.2} // Cuántas diapositivas mostrar a la vez (parcialmente visible)
  slidesPerGroup={1} // Cuántas diapositivas avanzar en cada movimiento
  centeredSlides={true} // Centrar la diapositiva activa
  loop={true} // Activar modo bucle
  pagination={{ clickable: true }} // Agregar puntos de paginación
  className="rounded-md px-6"
>
  {imagesboda1.map((src, index) => (
    <SwiperSlide key={index} className="pt-4 px-6">
      <img
        src={src}
        alt={`Slide ${index}`}
        className="w-full h-56 object-cover rounded-lg bg-blue-500 rounded transition duration-300 hover:scale-105 p-2"
        onClick={() => handleImageClick(src)}
      />
    </SwiperSlide>
  ))}
</Swiper>
    </div>

  </>
)}


{eventType === 'fiesta' && (
  <>
    {/* Sección de Carrusel: Para Niños */}
    <div className="mb-6  mt-6 bg-white rounded-xl  px-4 ">
      <SparklesText text="Diseños Variados"className="text-2xl text-center font-semibold mb-4 text-black" id="cards-title"/>
      <Swiper
        spaceBetween={15}
        slidesPerView={1.2}
        centeredSlides={true}
        loop={true}
        pagination={{ clickable: true }}
        className="rounded-md px-6"
      >
        {imagesfiesta.map((src, index) => (
          <SwiperSlide key={index} className="pt-4 px-6">
            <img
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-56 object-cover rounded-lg bg-blue-500 rounded transition duration-300 hover:scale-105 p-2"
              onClick={() => handleImageClick(src)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

    <div className="mb-6  mt-6 bg-white rounded-xl  px-4 ">
      <SparklesText text="Diseños de Disco"className="text-2xl text-center font-semibold mb-4 text-black" id="cards-title"/>
      <Swiper
        spaceBetween={15}
        slidesPerView={1.2}
        centeredSlides={true}
        loop={true}
        pagination={{ clickable: true }}
        className="rounded-md px-6"
      >
        {imagesfiesta1.map((src, index) => (
          <SwiperSlide key={index} className="pt-4 px-6">
            <img
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-56 object-cover rounded-lg bg-blue-500 rounded transition duration-300 hover:scale-105 p-2"
              onClick={() => handleImageClick(src)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

    <div className="mb-6  mt-6 bg-white rounded-xl  px-4 ">
      <SparklesText text="Diseños de Bebidas"className="text-2xl text-center font-semibold mb-4 text-black" id="cards-title"/>
      <Swiper
        spaceBetween={15}
        slidesPerView={1.2}
        centeredSlides={true}
        loop={true}
        pagination={{ clickable: true }}
        className="rounded-md px-6"
      >
        {imagesfiesta2.map((src, index) => (
          <SwiperSlide key={index} className="pt-4 px-6">
            <img
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-56 object-cover rounded-lg bg-blue-500 rounded transition duration-300 hover:scale-105 p-2"
              onClick={() => handleImageClick(src)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

  </>
)}



{eventType === 'reunion' && (
  <>
    {/* Sección de Carrusel: Para Niños */}
    <div className="mb-6  mt-6 bg-white rounded-xl  px-4 ">
      <SparklesText text="Temas Variados"className="text-2xl text-center font-semibold mb-4 text-black" id="cards-title"/>
      <Swiper
        spaceBetween={15}
        slidesPerView={1.2}
        centeredSlides={true}
        loop={true}
        pagination={{ clickable: true }}
        className="rounded-md px-6"
      >
        {imagesreuniones.map((src, index) => (
          <SwiperSlide key={index} className="pt-4 px-6">
            <img
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-56 object-cover rounded-lg bg-blue-500 rounded transition duration-300 hover:scale-105 p-2"
              onClick={() => handleImageClick(src)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>


     <div className="mb-6  mt-6 bg-white rounded-xl  px-4 ">
      <SparklesText text="Temas Claros"className="text-2xl text-center font-semibold mb-4 text-black" id="cards-title"/>
      <Swiper
        spaceBetween={15}
        slidesPerView={1.2}
        centeredSlides={true}
        loop={true}
        pagination={{ clickable: true }}
        className="rounded-md px-6"
      >
        {imagesreuniones1.map((src, index) => (
          <SwiperSlide key={index} className="pt-4 px-6">
            <img
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-56 object-cover rounded-lg bg-blue-500 rounded transition duration-300 hover:scale-105 p-2"
              onClick={() => handleImageClick(src)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

    <div className="mb-6  mt-6 bg-white rounded-xl  px-4 ">
      <SparklesText text="Temas Oscuros"className="text-2xl text-center font-semibold mb-4 text-black" id="cards-title"/>
      <Swiper
        spaceBetween={15}
        slidesPerView={1.2}
        centeredSlides={true}
        loop={true}
        pagination={{ clickable: true }}
        className="rounded-md px-6"
      >
        {imagesreuniones2.map((src, index) => (
          <SwiperSlide key={index} className="pt-4 px-6">
            <img
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-56 object-cover rounded-lg bg-blue-500 rounded transition duration-300 hover:scale-105 p-2"
              onClick={() => handleImageClick(src)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>





  </>
)}

<div className="overflow-x-auto flex ">
          {/* Sección de texto */}
          <div className="min-w-full max-w-[100%]  flex-center px-4 justify-center text-justify flex text-center items-center align-center">
         
            {responseText ? (
             <ShineBorder className=" rounded-md p-6" color={["#A07CFE", "#FE8FB5", "#FFBE7B"]} borderWidth="3">
                <h1 className='text-sm font-bold'>Tu invitacion genereda</h1>
                <IonText className='text-sm'>{responseText}</IonText>
              </ShineBorder>
              
            ) : (
              <IonText>Compartir por...</IonText>
            )}
          </div>
          
          
  <div
  id="invitation"
  className="bg-white p-4 rounded-lg max-w-lg relative min-w-full"
  style={{ position: 'relative' }} 
>
  
  <div
    className="absolute inset-0 w-full h-full bg-cover bg-center "
    style={{
      backgroundImage: `url(${selectedImage})`,
      opacity: 0.5, 
  
    }}
  ></div>


  {/* Contenido */}
  <div className="text-center mb-6 relative z-10" style={{
        color: textColor,
        fontFamily: fontFamily,
        opacity: backgroundOpacity, // Dinámica opacidad
      }}>
      <h1 className="text-3xl font-bold" style={{ color: headerTextColor }}>
        ¡Estás invitado!
      </h1>
    <p className="text-lg mt-2 ">A un evento muy especial</p>
    {/* Mostrar los detalles del evento */}
  <div className="mb-4 text-justify"
  >
  {inviteeName && (
  <p><strong>Nombre del invitado:</strong> {inviteeName}</p>
)}
    <p><strong>Fecha del evento:</strong> {eventDate}</p>
    <p><strong>Hora del evento:</strong> {eventTime}</p>
    <p><strong>Lugar del evento:</strong> {eventLocation}</p>
    <p><strong>Tipo de evento:</strong> {eventType}</p>
    {eventType === '' && (
      <>
        <p><strong>Nombre del cumpleañero:</strong> {birthdayName}</p>
        <p><strong>Edad del cumpleañero:</strong> {birthdayAge}</p>
      </>
    )}
    {eventType === 'boda' && (
      <>
        <p><strong>Nombre del Esposo:</strong> {nameperson1}</p>
        <p><strong>Edad de la Esposa:</strong> {nameperson2}</p>
      </>
    )}
{eventType === 'fiesta' && (
      <>
        <p><strong>Asunto:</strong> {asunto}</p>
        <p><strong>Organizador:</strong> {organizador}</p>
      </>
    )}
  </div>
  
  </div>
</div>

        </div>
        

        <div className="flex justify-center items-center gap-4 mt-2">
  <IonButton
    color="primary"
    className=""
    onClick={() => {
      captureAsImage();
      showAllStoredItems();
    }}
  >
    Compartir Invitación
  </IonButton>
  <IonButton className="w-16 text-center" onClick={() => setShowModal(true)}>🖊️</IonButton>
</div>




<IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
  <IonHeader>
    <IonToolbar>
      <IonTitle>Personalizar Invitación</IonTitle>
    </IonToolbar>
  </IonHeader>
 
    {/* Vista previa en el modal */}
    <div className="relative z-10 border rounded-lg p-6 shadow-md bg-white">
  <div
    className="text-center mb-6 rounded-lg overflow-hidden bg-cover bg-center p-4 relative"
    style={{
      color: textColor,
      fontFamily: fontFamily,
      backgroundImage: `url(${selectedImage})`,
      backgroundColor: "rgba(255, 255, 255, 0.8)", // Fondo ligeramente transparente
      opacity: backgroundOpacity,
    }}
  >
    <h1 className="text-4xl font-extrabold mb-4" style={{ color: headerTextColor }}>
      ¡Estás invitado!
    </h1>
    <p className="text-base italic mb-6">A un evento muy especial</p>

    <div className="text-left px-4">
      {inviteeName && (
        <p className="mb-2">
          <strong className="font-semibold">Nombre del invitado:</strong> {inviteeName}
        </p>
      )}
      <p className="mb-2">
        <strong className="font-semibold">Fecha del evento:</strong> {eventDate}
      </p>
      <p className="mb-2">
        <strong className="font-semibold">Hora del evento:</strong> {eventTime}
      </p>
      <p className="mb-2">
        <strong className="font-semibold">Lugar del evento:</strong> {eventLocation}
      </p>
      <p className="mb-4">
        <strong className="font-semibold">Tipo de evento:</strong> {eventType}
      </p>

      {/* Condicionales según el tipo de evento */}
      {eventType === "" && (
        <>
          <p className="mb-2">
            <strong className="font-semibold">Nombre del cumpleañero:</strong> {birthdayName}
          </p>
          <p className="mb-4">
            <strong className="font-semibold">Edad del cumpleañero:</strong> {birthdayAge}
          </p>
        </>
      )}
      {eventType === "boda" && (
        <>
          <p className="mb-2">
            <strong className="font-semibold">Nombre del Esposo:</strong> {nameperson1}
          </p>
          <p className="mb-4">
            <strong className="font-semibold">Nombre de la Esposa:</strong> {nameperson2}
          </p>
        </>
      )}
      {eventType === "fiesta" && (
        <>
          <p className="mb-2">
            <strong className="font-semibold">Asunto:</strong> {asunto}
          </p>
          <p className="mb-4">
            <strong className="font-semibold">Organizador:</strong> {organizador}
          </p>
        </>
      )}
    </div>
  </div>

  {/* Opciones de personalización */}
  <div className="space-y-6">
    {/* Color del encabezado */}
    <div>
      <label className="block mb-2 font-medium">Color del texto del encabezado</label>
      <IonSelect
        value={headerTextColor}
        placeholder="Selecciona un color"
        onIonChange={(e) => setHeaderTextColor(e.detail.value)}
      >
        <IonSelectOption value="black">Negro</IonSelectOption>
        <IonSelectOption value="white">Blanco</IonSelectOption>
        <IonSelectOption value="blue">Azul</IonSelectOption>
        <IonSelectOption value="red">Rojo</IonSelectOption>
        <IonSelectOption value="green">Verde</IonSelectOption>
      </IonSelect>
    </div>

    {/* Color del texto */}
    <div>
      <label className="block mb-2 font-medium">Color del texto</label>
      <IonSelect
        value={textColor}
        placeholder="Selecciona un color"
        onIonChange={(e) => setTextColor(e.detail.value)}
      >
        <IonSelectOption value="black">Negro</IonSelectOption>
        <IonSelectOption value="white">Blanco</IonSelectOption>
        <IonSelectOption value="blue">Azul</IonSelectOption>
        <IonSelectOption value="red">Rojo</IonSelectOption>
        <IonSelectOption value="green">Verde</IonSelectOption>
      </IonSelect>
    </div>

    {/* Selección de fuente */}
    <div>
      <label className="block mb-2 font-medium">Fuente</label>
      <IonSelect
        value={fontFamily}
        placeholder="Selecciona una fuente"
        onIonChange={(e) => setFontFamily(e.detail.value)}
      >
        <IonSelectOption value="Arial">Arial</IonSelectOption>
        <IonSelectOption value="Georgia">Georgia</IonSelectOption>
        <IonSelectOption value="Courier New">Courier New</IonSelectOption>
        <IonSelectOption value="Times New Roman">Times New Roman</IonSelectOption>
      </IonSelect>
    </div>

    {/* Selección de opacidad */}
    <div>
      <label className="block mb-2 font-medium">Opacidad del fondo</label>
      <IonSelect
        value={backgroundOpacity}
        placeholder="Selecciona opacidad"
        onIonChange={(e) => setBackgroundOpacity(parseFloat(e.detail.value))}
      >
        <IonSelectOption value={0.1}>10%</IonSelectOption>
        <IonSelectOption value={0.5}>50%</IonSelectOption>
        <IonSelectOption value={0.8}>80%</IonSelectOption>
        <IonSelectOption value={0.9}>90%</IonSelectOption>
        <IonSelectOption value={1}>100%</IonSelectOption>
      </IonSelect>
    </div>
  </div>

  {/* Botón de guardar */}
  <div className="mt-8">
    <IonButton expand="block" color="primary" onClick={() => setShowModal(false)}>
      Guardar cambios
    </IonButton>
  </div>
</div>
      </IonModal>
    



</IonContent>

<IonFooter className=''>
        <IonToolbar className=''>
          <IonTitle className="text-center ">© 2024 EvoParty</IonTitle>
        </IonToolbar>
      </IonFooter>
      
</IonPage>
);
};

export default CapturarInvitacion;
