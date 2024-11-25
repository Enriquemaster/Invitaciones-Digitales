import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonButton,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonLabel,
  IonItem,
  IonList,
  IonToast,
} from "@ionic/react";
import { Storage } from "@ionic/storage";
import "./Tab2.css";

const Tab2: React.FC = () => {
  const [eventData, setEventData] = useState({
    type: "",
    guest: "",
    location: "",
    date: "",
    celebrant: "",
  });
  const [invitations, setInvitations] = useState<any[]>([]);
  const [toastMessage, setToastMessage] = useState<string>("");
  const storage = new Storage();

  useEffect(() => {
    const initStorage = async () => {
      await storage.create();
      const storedInvitations = await storage.get("invitations");
      if (storedInvitations) setInvitations(storedInvitations);
    };
    initStorage();
  }, []);

  const saveInvitation = async () => {
    if (!eventData.type || !eventData.guest || !eventData.location || !eventData.date) {
      setToastMessage("Por favor, completa todos los campos requeridos.");
      return;
    }

    const newInvitation = { ...eventData, id: Date.now() };
    const updatedInvitations = [...invitations, newInvitation];
    setInvitations(updatedInvitations);
    await storage.set("invitations", updatedInvitations);

    setEventData({ type: "", guest: "", location: "", date: "", celebrant: "" });
    setToastMessage("¡Invitación guardada con éxito!");
  };

  const deleteInvitation = async (id: number) => {
    const updatedInvitations = invitations.filter((invitation) => invitation.id !== id);
    setInvitations(updatedInvitations);
    await storage.set("invitations", updatedInvitations);
    setToastMessage("Invitación eliminada.");
  };

  const renderCards = () => {
    return invitations.map((invitation) => (
      <div
        key={invitation.id}
        className={`event-card ${invitation.type.toLowerCase()}`}
      >
        <div className="card-header">
          <div className="icon"></div>
          <h2>
            {invitation.type === "Cumpleaños"
              ? "¡Feliz Cumpleaños!"
              : invitation.type === "Boda"
              ? "¡Felicidades por la boda!"
              : invitation.type === "Fiesta"
              ? "¡Es hora de una Fiesta!"
              : "¡Próxima Reunión!"}
          </h2>
        </div>
        <div className="card-body">
          <p><strong>Invitado:</strong> {invitation.guest}</p>
          <p><strong>Lugar:</strong> {invitation.location}</p>
          <p><strong>Fecha:</strong> {new Date(invitation.date).toLocaleString()}</p>
          {invitation.type === "Cumpleaños" && (
            <p><strong>Cumpleañero:</strong> {invitation.celebrant}</p>
          )}
        </div>
        <div className="card-footer">
          <IonButton
            color="danger"
            fill="solid"
            onClick={() => deleteInvitation(invitation.id)}
          >
            Eliminar
          </IonButton>
        </div>
      </div>
    ));
  };

  return (
    <IonPage>
      <IonContent>
        <div className="form-container">
          <h1>Crear Invitación</h1>
          <IonList>
            <IonItem>
              <IonLabel position="floating">Tipo de Evento</IonLabel>
              <IonSelect
                value={eventData.type}
                placeholder="Selecciona"
                onIonChange={(e) => setEventData({ ...eventData, type: e.detail.value })}
              >
                <IonSelectOption value="Cumpleaños">Cumpleaños</IonSelectOption>
                <IonSelectOption value="Boda">Boda</IonSelectOption>
                <IonSelectOption value="Fiesta">Fiesta</IonSelectOption>
                <IonSelectOption value="Reunión">Reunión</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Invitado</IonLabel>
              <IonInput
                value={eventData.guest}
                onIonChange={(e) => setEventData({ ...eventData, guest: e.detail.value! })}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Lugar</IonLabel>
              <IonInput
                value={eventData.location}
                onIonChange={(e) => setEventData({ ...eventData, location: e.detail.value! })}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Fecha y Hora</IonLabel>
              <IonDatetime
                value={eventData.date}
                onIonChange={(e) =>
                  setEventData({
                    ...eventData,
                    date: typeof e.detail.value === "string" ? e.detail.value : "",
                  })
                }
              />
            </IonItem>
            {eventData.type === "Cumpleaños" && (
              <IonItem>
                <IonLabel position="floating">Cumpleañero</IonLabel>
                <IonInput
                  value={eventData.celebrant}
                  onIonChange={(e) => setEventData({ ...eventData, celebrant: e.detail.value! })}
                />
              </IonItem>
            )}
          </IonList>
          <IonButton expand="block" onClick={saveInvitation}>
            Guardar Invitación
          </IonButton>
        </div>
        <div className="cards-container">{renderCards()}</div>
        <IonToast
          isOpen={!!toastMessage}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setToastMessage("")}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
