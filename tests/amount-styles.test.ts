const getAmountStyles = (amount: number) => {
  return {
    className: amount >= 0 ? 'text-green-600' : 'text-red-600',
    formatted: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount),
  };
};

describe('Lógica Visual. Formato de Montos', () => {
  it('debe retornar clase verde para ingresos (positivos)', () => {
    const result = getAmountStyles(500);
    expect(result.className).toBe('text-green-600');
    expect(result.formatted).toContain('$500.00');
  });

  it('debe retornar clase roja para egresos (negativos)', () => {
    const result = getAmountStyles(-150);
    expect(result.className).toBe('text-red-600');
    expect(result.formatted).toContain('-$150.00');
  });
});
