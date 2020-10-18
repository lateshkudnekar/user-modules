# user-modules

## To run the project

`npm install`

*Run following commands to migrate database*

`specify db username and password into src/config/config.json`
```
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all // create admin user and modules

```

### Admin apis
- http://localhost:3001/api/v1/admin/sign-in (params: username:admin, password:@dmin12)
- http://localhost:3001/api/v1/admin/assign-module (params: userID, moduleId)
- http://localhost:3001/api/v1/admin/unassign-module (params: userID, moduleId)
- http://localhost:3001/api/v1/admin/get-all-modules
- http://localhost:3001/api/v1/admin/list-users

### User apis
- http://localhost:3001/api/v1/auth/sign-in (params: username, password)
- http://localhost:3001/api/v1/auth/sign-up (params: username, password)
- http://localhost:3001/api/v1/auth/get-modules
