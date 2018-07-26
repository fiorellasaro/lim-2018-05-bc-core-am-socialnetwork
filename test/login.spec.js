describe('login', () => {
  it('debería exponer función registerUser en objeto global', () => {
    assert.isFunction(registerUser);
  });
  it('debería exponer función validateEmail en objeto global', () => {
    assert.isFunction(validateEmail);
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
    })
    it('debería retornar false para yunoshe1@gmail.com', () => {
      assert.equal(validateEmail('yuno@she1@gmail.com'), false);
    })
  });
  describe('loginUser(email,password)', () => {
    it('deberia logear un usuario con email y password', () => {
      mocksdk.auth().autoFlush();
      // create user
      mocksdk.auth().createUser({
        uid: '123',
        email: 'test@test.com',
        password: 'abc123'
      }).then((user) => {
        mocksdk.auth().changeAuthState(user);
      });
      const callback = () => {
        console.log('hola')
      }
      const callbackError = () => {
        console.log('error')
      }
      loginUser('test@test.com','abc123',callback,callbackError) 
    })
  });
});