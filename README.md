# Key Learnings

## 1. Building Microservices Applications
Expertise in architecting scalable microservices-based applications to ensure modularity and maintainability.

---

## 2. Implementing Event-Driven Architectures
Leveraged event-driven systems for seamless communication between services, improving responsiveness and decoupling dependencies.

---

## 3. Distributed Authentication
Passed login credentials securely across services, ensuring consistent authentication and authorization flows throughout the application.

---

## 4. Optimizing MongoDB Data Models
Designed and optimized MongoDB schemas for efficient data storage and retrieval, ensuring high performance at scale.

---

## 5. Utilizing Mongoose for Transactions
Leveraged Mongoose to manage MongoDB interactions, including complex transactional operations.

---

## 6. Service Synchronization with NATS Streaming
Synchronized microservices using NATS streaming to ensure reliable data communication between distributed systems.

---

## 7. Integrating Stripe Payments
Integrated Stripe for secure, efficient payment processing, enhancing the application's financial capabilities.

---

## 8. Kubernetes Configuration
Wrote Kubernetes deployment and service configuration files for seamless container orchestration and application scaling.

---

## 9. Docker and Kubernetes Fundamentals
Proficient in Docker for containerization and Kubernetes for orchestrating containerized applications in production environments.

---

## 10. Cross-Service Data Replication
Implemented cross-service data replication strategies to ensure data consistency across microservices.

---

## 11. Reusable Code through Custom NPM Libraries
Created and shared reusable code by building custom NPM libraries, enhancing code maintainability and reducing duplication.

---

## 12. Automated Testing with JEST
Implemented robust unit and integration tests using JEST to ensure high code quality and prevent regressions.

---

## 13. DigitalOcean Application Deployment
Deployed applications to DigitalOcean using Kubernetes, ensuring high availability and ease of scaling.

---

## 14. Automated PR Testing
Automated the testing process to run whenever a pull request is created, ensuring code stability before merging.

---

## 15. CI/CD with Docker Hub
Created Docker images and pushed them to Docker Hub, streamlining continuous integration and deployment processes.

---

## 16. Rolling Updates with Kubernetes
Managed Kubernetes deployments to roll out updates with zero downtime, ensuring smooth application transitions.

---

## 17. Application Hosting on DigitalOcean Kubernetes
Used DigitalOcean Kubernetes for efficient hosting and scaling of microservices applications.

---



### Command to set the secret (Object creation without yaml)

```bash
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
```

### Internal communication between pods in the system
- **URL to be used in case of SSR**: `http://SERVICE_NAME.NAMESPACE.svc.cluster.local/<PATH FOR API>`
- **To Find the NAMESPACE**:   `kubectl get namespaces`
- **To find the SERVICE_NAME**: `kubectl get services -n <NAMESPACE>`

use above commands to know the service names and namespaces, and use them accordingly in the URL


Learnt how to create account in the npmjs and publish own npm package


Enable this command in order to expose the port from nats to outside world `kubectl port-forward nats-depl-5d6dc844bc-gjhhb 4222:4222`









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
   