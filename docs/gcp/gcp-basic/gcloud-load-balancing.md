---
sidebar_position: 4
displayed_sidebar: gcpSidebar
---

# Gcloud Load Balancing

![alt text](gcloud-load-balancing.png)

## Load Balancing

### Overview

![Overview](image-2.png)

- Cloud Load Balancing receives client traffic
- The backend can be backend service or a backend bucket

### Backend configuration defines:

- How traffic is distributed.
- Which health check to use.
- If session affinity is use.
- Which other services are used (such as Cloud CDN or Identity Aware Proxy)

Cloud Load Balancing can route traffic to:

- Backend services: Managed instance groups, Network endpoint groups, Cloud Storage backend buckets

### Types of load balancers

#### Application Load Balancer (HTTP / HTTPS)

Works as reverse proxy

![alt text](image-4.png)

#### Network Load Balancer (TCP/UDP/ other IP protocols)

![alt text](image-5.png)

## Hybrid Load Balancing & Traffic Management

- A hybrid strategy lets you extend Cloud Load Balancing to workloads that run on your existing infrastructure outside of Google Cloud.

The strategy could be:

- Permanent to provide multiple platforms for your workloads
- Temporary as you prepare to migrate your internal or external workload to Google Cloud

### Usecases

![alt text](image-7.png)

![alt text](image-8.png)

![alt text](image-9.png)

### Types of load balancers that support hybrid load balancing

![alt text](image-10.png)

### Caveats

![alt text](image-11.png)

## Traffic Management

- Not all load balancers support traffic management
- Wildcards are supported, but only after a forward slash. Eg: /videos/_ (valid) - /videos_ (invalid)
- Substring matching and regular expressions are not supported.

### Usecase: Distribute traffic by using URL map

![alt text](image-12.png)

![alt text](image-13.png)

![alt text](image-14.png)

## Terminologies

### Network endpoint groups (NEGs)

![alt text](image-6.png)

- A configuration object that specifies a group of backend endpoints or services

- A common use case for this configuration is deploying services in GKE.

**There are 5 types of NEGs:**

- Zonal
- Internet
- Serverless
- Private Service Connect
- Hybrid connectivity

### Identity Aware Proxy

![alt text](image-3.png)

- Identity-Aware Proxy (IAP) is a cloud-native alternative to traditional VPNs that manages access to applications running in Cloud Run, App Engine, Compute Engine, and GKE.

- IAP verifies identity and enforces authorization at the application level, eliminating broad network access and perimeter-based security. Every request is evaluated in real time, ensuring only authenticated, authorized users can reach protected resources.

- You can configure context-aware access policies using user identity, group membership, device security, and contextual signals like location or IP address. Unlike VPNs, IAP requires no client software or network tunneling. Users access applications directly through Chrome, while IT teams centrally define and enforce access policies in one place.

## Labs

### Blue Green Deployment

Blue: current version of your application
Green: new version of your application

In this lab, you create a regional internal Application Load Balancer with two backends. Each backend will be an instance group. You will configure the load balancer to create a blue-green deployment.

The blue deployment refers to the current version of your application, and the green deployment refers to a new application version. You configure the load balancer to send 70% of the traffic to the blue deployment and 30% to the green deployment. When you’re finished, the environment will look like this:

![alt text](image-15.png)

#### Steps

1. Create VPC Network and its subnets

![alt text](image-16.png)

![alt text](image-18.png)

2. Config firewall

![alt text](image-17.png)

![alt text](image-19.png)

3. Create instance groups

![alt text](image-20.png)

![alt text](image-21.png)

4. Configure load balancer

![alt text](image-22.png)

![alt text](image-23.png)

![alt text](image-24.png)

![alt text](image-25.png)

![alt text](image-26.png)

![alt text](image-27.png)

Create backend service, health check

![alt text](image-28.png)

Routes

```yml
defaultService: regions/us-west1/backendServices/blue-service
name: matcher1
routeRules:
  - matchRules:
      - prefixMatch: /
    priority: 0
    routeAction:
      weightedBackendServices:
        - backendService: regions/us-west1/backendServices/blue-service
          weight: 70
        - backendService: regions/us-west1/backendServices/green-service
          weight: 30
```

## Caching and Optimizing Load Balancing

### Internal Network Load Balancers are fast

![alt text](image-29.png)

#### Usecases

![alt text](image-30.png)

Next hop

![alt text](image-31.png)

Next hop to a NAT gateway

![alt text](image-32.png)

Using a hub and spoke topology

![alt text](image-33.png)

Load balancing to multiple NICs

![alt text](image-34.png)

## Cloud CDN ( content delivery network )

### Cache Mode

![alt text](image-35.png)

### CDN Interconnect

![alt text](image-36.png)

![alt text](image-37.png)

## Google Cloud Armor

![alt text](image-38.png)

## Cost optimized

- Dynamically adjust resources
- Define scaling threshold
- Utilize custom metrics

![alt text](image-39.png)

![alt text](image-40.png)

![alt text](image-41.png)

## References

- https://storage.googleapis.com/cloud-training/gcpnet/v3.0/student/11_Hybrid%20Load%20Balancing%20and%20Traffic%20Management_ILT.pdf
- https://storage.googleapis.com/cloud-training/gcpnet/v3.0/student/12_Caching%20and%20Optimizing%20Load%20Balancing_ILT.pdf
