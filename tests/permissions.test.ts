const hasPermission = (userPermissions: string[], required: string) => {
  return (
    userPermissions.includes(required) || userPermissions.includes('ADMIN')
  );
};

describe('Control de Accesos', () => {
  it('debe permitir el acceso si el usuario tiene el permiso específico', () => {
    const permissions = ['movements_permission', 'create_movements_permission'];
    expect(hasPermission(permissions, 'create_movements_permission')).toBe(
      true
    );
  });

  it('debe denegar el acceso si el usuario no tiene el permiso', () => {
    const permissions = ['movements_permission'];
    expect(hasPermission(permissions, 'users_permission')).toBe(false);
  });

  it('debe permitir cualquier acción si el usuario es ADMIN', () => {
    const permissions = ['ADMIN'];
    expect(hasPermission(permissions, 'reports_permission')).toBe(true);
  });
});
