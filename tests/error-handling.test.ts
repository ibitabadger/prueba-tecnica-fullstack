const getFriendlyErrorMessage = (error: any) => {
  if (error?.status === 401) return 'No autorizado. Debes iniciar sesión.';
  return error?.message || 'Ha ocurrido un error inesperado';
};

describe('Utilidades: Manejo de Errores', () => {
  it('debe manejar errores de autenticación', () => {
    const error = { status: 401 };
    expect(getFriendlyErrorMessage(error)).toBe(
      'No autorizado. Debes iniciar sesión.'
    );
  });

  it('debe devolver el mensaje genérico si el error no está tipificado', () => {
    const error = { message: 'Fallo de conexión' };
    expect(getFriendlyErrorMessage(error)).toBe('Fallo de conexión');
  });
});
