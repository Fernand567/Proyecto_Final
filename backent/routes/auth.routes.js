const Users=require  ('../controller/auth.controller');
module.exports=(router)=>{
    router.post('/register',Users.createUser);
    router.post('/login',Users.loginUser);
    router.get('/admin-page/users',Users.getUsers);
    router.delete('/admin-page/users/:id',Users.deleteUser);
    router.get('/admin-page/users/:id',Users.getUserById);
    router.put('/admin-page/users/:id',Users.updateUser);


}