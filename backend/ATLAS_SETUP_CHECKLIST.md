# MongoDB Atlas Setup Checklist - Task Manager App

## Project Setup
- [ ] New project "Task Manager App" created in Atlas
- [ ] Project selected in Atlas dashboard

## Cluster Setup
- [ ] New cluster created (TaskManagerCluster or Cluster0)
- [ ] Cluster status shows "Active" (green)
- [ ] Cluster region selected appropriately

## Security Configuration
- [ ] Database user created
  - Username: taskmanager_user
  - Password: Saved securely
  - Privileges: Read and write to any database
- [ ] IP Address whitelisted
  - Option: 0.0.0.0/0 (development) or specific IP
  - Status: Active

## Connection Configuration
- [ ] Connection string obtained from Atlas
- [ ] Password replaced in connection string
- [ ] Special characters URL-encoded (if any)
- [ ] Database name added: /task-manager
- [ ] Connection string added to backend/.env
- [ ] .env file added to .gitignore

## Testing
- [ ] Backend test script executed: npm run test:atlas
- [ ] Connection successful
- [ ] Write operation successful
- [ ] Read operation successful
- [ ] Can view database in Atlas dashboard

## Documentation
- [ ] Credentials saved securely (not in Git)
- [ ] Connection string documented
- [ ] Project information documented