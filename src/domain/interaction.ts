export interface Interaction {
  id: string;
  userId: string;
  teamId: string | null;
  message: string | null;
  type: string; // ej: 'newsletter', 'contact'
  createdAt: Date;
}

export interface CreateInteractionRequest {
  teamId?: string; // Opcional: si se suscribe a una escudería específica
  message?: string; // Opcional: mensaje de contacto
  type: string;
}