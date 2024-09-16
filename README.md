### Command to set the secret (Object creation without yaml)

```bash
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
```

### Internal communication between pods in the system
- **URL to be used in case of SSR**: `http://SERVICE_NAME.NAMESPACE.svc.cluster.local/<PATH FOR API>`
- **To Find the NAMESPACE**:   `kubectl get namespaces`
- **To find the SERVICE_NAME**: `kubectl get services -n <NAMESPACE>`

use above commands to know the service names and namespaces, and use them accordingly in the URL







# Mistakes
1. **Missing / in begining of path in nodejs api**

    Not using the '/' in begining of nodejs api's on multiple inspection the code seemed to be written normal, didn't debug instead wasted half day try check method of different parts of code such as yaml file, restarting skaffold.

    **Learnings**
    - debug the backend with help of nodejs and postman to makesure the backend is working perfectly
    - once confirmed that code is working fine then debug the clusters and services
    - directly checking randomly wastes time, patience is important

2. **Circular structure in get initial props error**
   
    Circular stucture, This was happening due to req parameter is not serializable, so it was causing the error, solution for this problem is passing the required data instead of sending everything at once

    **Learnings**

    - using destructured declaration will help to get the values from response
    `const { data } = await client.get('/api/users/current-user');`
    - we can also do something like `response.data` while returing the object from getInitialProps if we are declaring without destructuring instead of `const response = await client.get('/api/users/current-user');`
    
3. **Missing the next function return in middleware lead to gateway-timeout**
    Missing the `return next()` was making the request in pending state for long time as it was not coming out of loop
    ```javascript
    export const requireAuth = (req: Request, res:Response, next: NextFunction) =>{
    try{
        if(!req.currentUser){
            throw new NotAuthorizedError(); 
        }
    }
    catch(err){
    }
    return next()
   }
   ```

   **Learnings** 

   - always ensure the error handling mechanism works with test cases during developments
   