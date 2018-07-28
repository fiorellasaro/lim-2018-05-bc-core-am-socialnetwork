describe('validation', () => {
  it('debería exponer función validateEmail en objeto global', () => {
    assert.isFunction(validateEmail);
  });
  it('debería exponer función passwordLength en objeto global', () => {
    assert.isFunction(passwordLength);
  });
  it('debería exponer función passwordRepeatValid en objeto global', () => {
    assert.isFunction(passwordRepeatValid);
  });
  describe('validateEmail(email)', () => {
    it('debería retornar true para yunoshe1@gmail.com', () => {
      assert.equal(validateEmail('yunoshe1@gmail.com'), true);
    })
    it('debería retornar false para yunoshe1@gmail.com', () => {
      assert.equal(validateEmail('yuno@she1@gmail.com'), false);
    })
  });
  describe('passwordLength', () => {
    it('deberia devolver true para Ald1023.', () => {
      assert.deepEqual(passwordLength('Ald1023.'),true)
    })
    it('deberia devolver false para 1023', () => {
      assert.deepEqual(passwordLength('1023'),false)
    })
  });
  describe('passwordRepeatValid', () => {
    it('deberia devolver true para Ald1023 y Ald1023.', () => {
      assert.deepEqual(passwordRepeatValid('Ald1023.','Ald1023.'),true)
    })
    it('deberia devolver false para Ald1023 y 1023', () => {
      assert.deepEqual(passwordRepeatValid('Ald1023.','1023'),false)
    })
  });
});