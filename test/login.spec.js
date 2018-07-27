describe('login', () => {
  it('debería exponer función validateEmail en objeto global', () => {
    assert.isFunction(validateEmail);
  });
  describe('validateEmail(email)', () => {
    it('debería retornar true para yunoshe1@gmail.com', () => {
      assert.equal(validateEmail('yunoshe1@gmail.com'), true);
    })
    it('debería retornar false para yunoshe1@gmail.com', () => {
      assert.equal(validateEmail('yuno@she1@gmail.com'), false);
    })
  });
});