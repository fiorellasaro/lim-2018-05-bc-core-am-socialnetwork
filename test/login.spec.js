describe('login', () => {
  it('debería exponer función registerUser en objeto global', () => {
    assert.isFunction(registerUser);
  });
  it('debería exponer función validateEmail en objeto global', () => {
    assert.isFunction(validateEmail);
  });
  it('debería exponer función observerUser en objeto global', () => {
    assert.isFunction(observerUser);
  });
  it('debería exponer función checkUser en objeto global', () => {
    assert.isFunction(checkUser);
  });
  it('debería exponer función loginUser en objeto global', () => {
    assert.isFunction(loginUser);
  });
  it('debería exponer función sesionFacebook en objeto global', () => {
    assert.isFunction(sesionFacebook);
  });
  it('debería exponer función sesionGoogle en objeto global', () => {
    assert.isFunction(sesionGoogle);
  });
  describe('validateEmail(email)', () => {
    it('debería retornar true para yunoshe1@gmail.com', () => {
      assert.equal(validateEmail('yunoshe1@gmail.com'), true);
      assert.equal(validateEmail('yuno@she1@gmail.com'), false);
    })
  });
});