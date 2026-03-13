# MADE Storefront Plan

## Goal

Turn the current MADE site into an online ceramics storefront that can:

- display and sell products cleanly
- support customer accounts
- process payments
- track shipments
- let an admin publish and manage products
- run on AWS for hosting and backend infrastructure

## Recommended Direction

### Recommendation: Shopify-first commerce stack

Use Shopify as the commerce system of record, and keep AWS focused on hosting, integration, and custom app logic.

Why this is the best default:

- Shopify already solves products, inventory, checkout, orders, fulfillment state, and merchant admin
- Shopify already has customer accounts, order history, and order status pages
- Shopify already supports shipping/tracking workflows if tracking numbers are added to fulfillments
- this avoids rebuilding core commerce features that Stripe alone does not provide

### Important constraint

If Apple sign-in is mandatory at launch, Shopify customer accounts are not a clean default unless one of these is true:

- we accept Shopify customer accounts with passwordless + Google/Facebook only
- we are on Shopify Plus and connect our own identity provider
- we choose a custom auth stack instead of Shopify-managed customer auth

## Decision Gate

We need to choose between these two paths before implementation starts.

### Option A: Shopify-first

Use when the priority is shipping faster and minimizing custom commerce code.

What Shopify would own:

- products
- inventory
- checkout
- orders
- fulfillment state
- customer accounts
- order status / tracking
- merchant admin

What AWS would own:

- frontend hosting
- custom API layer / BFF
- webhook handlers
- optional custom content/media workflows

Tradeoffs:

- fastest route to a real store
- strongest admin and fulfillment story
- least custom backend work
- customer social sign-in is limited unless we upgrade to Shopify Plus or add external identity

### Option B: Custom storefront + Stripe

Use when the priority is maximum control over auth, checkout UX, and data ownership.

What we would build ourselves:

- product catalog backend
- cart and order system
- account system
- shipment tracking experience
- admin panel
- fulfillment integrations

What Stripe would own:

- payment collection
- wallets like Apple Pay / Google Pay through Stripe Checkout or Elements
- saved payment details

Tradeoffs:

- most flexible
- easiest way to guarantee email/password + Google + Apple via Cognito
- much more backend/admin/shipping work
- highest implementation and maintenance cost

## Recommendation on Payments

### If we choose Shopify-first

Use Shopify checkout and Shopify payments stack unless there is a hard business reason not to.

### If we choose custom commerce

Use Stripe Checkout Sessions first, not a fully custom embedded checkout.

Reason:

- Stripe recommends Checkout Sessions for most integrations
- it already covers line items, shipping, tax, discounts, and wallets
- it reduces PCI and checkout maintenance burden

## Frontend Changes

## Pages to remove, repurpose, or add

### Remove or repurpose

- `Journal`: remove for v1 and replace with either `Cart` or `Track Order`
- `Exhibitions`: repurpose into `Collections`, `Shop All`, or `Shipping / FAQ`
- `Process`: keep only if it supports the brand story; otherwise move it under `About`
- `Login`: replace current generic auth page with a real customer account entry flow

### Keep

- `Home`
- `About`
- the overall minimalist visual direction

### Add for storefront v1

- `Shop` / `All Ceramics`
- `Collection` pages
- `Product Detail`
- `Cart`
- `Checkout`
- `Account Dashboard`
- `Order History`
- `Order Detail / Track Shipment`
- `Shipping & Returns`
- `FAQ`
- `Contact`

### Add later if needed

- `Waitlist / Sold Out Restock Alerts`
- `Gift Cards`
- `Editorial / Studio Notes`
- `Wholesale / Trade`

## Frontend Requirements

- product cards need price, availability, and sold-out state
- product detail pages need image gallery, dimensions, materials, care, shipping notes, and add-to-cart
- cart needs quantity editing, subtotal, shipping/tax note, and checkout CTA
- account needs profile editing, address management, and order history
- order detail page needs fulfillment status, tracking number, and shipment progress
- admin uploads must support multiple images per product and optional product story text

## Backend Requirements

## Core data domains

- products
- variants
- inventory
- collections
- customers
- addresses
- carts
- orders
- payments
- fulfillments
- tracking numbers
- media assets
- admin roles / permissions

## Admin requirements

- one protected admin account on day one
- ability to create, edit, publish, unpublish, and archive products
- image upload support
- inventory updates
- fulfillment updates with tracking number entry
- order management and refund visibility

## Accounts and Authentication

Required auth modes:

- email/password or equivalent regular account flow
- Google sign-in
- Apple sign-in

### Shopify-first auth recommendation

- use Shopify customer accounts if passwordless + Google/Facebook is acceptable
- if Apple sign-in is mandatory, evaluate Shopify Plus with external identity provider

### Custom auth recommendation

- use Amazon Cognito
- enable native sign-in plus Google and Apple social providers
- use Cognito hosted login or a thin custom UI over Cognito APIs

## Shipment Tracking

### Recommended if Shopify-first

Use Shopify order status and fulfillment tracking as the default.

Why:

- customers can track orders on Shopify order status pages
- tracking numbers added to fulfillments appear in shipping confirmations and status updates
- Shopify supports real-time shipment updates for supported carriers

### Recommended if custom commerce

Do not build direct FedEx + UPS + USPS integrations first.

Start with one of these:

- a shipping aggregator
- manual tracking number entry plus carrier deep links

Direct carrier integrations should come only if there is a real operational need.

## Frontend / Backend Connection

### Recommended pattern

Use a backend-for-frontend (BFF) layer between the React app and commerce/auth providers.

Why:

- keeps secret keys off the client
- centralizes auth/session checks
- gives us one place for webhook handling and business rules
- makes it easier to swap providers later

### Shopify-first connection model

- React frontend calls AWS API endpoints for secure operations
- AWS BFF calls Shopify Storefront API for customer-facing commerce data as needed
- AWS webhook handlers listen for order / fulfillment / inventory events
- product/admin workflows live in Shopify Admin first, custom admin later if needed

### Custom commerce connection model

- React frontend calls AWS API Gateway endpoints
- Lambda functions handle auth-aware business logic
- backend talks to Stripe and shipping providers
- data persists in AWS-managed database + S3 media storage

## AWS Hosting and Backend Services

## Recommended AWS services for Shopify-first

- `AWS Amplify Hosting`: host the React frontend
- `Route 53`: DNS and domain management
- `AWS Certificate Manager`: TLS certificates
- `API Gateway`: public API endpoints for the frontend
- `Lambda`: BFF, webhook handlers, lightweight admin operations
- `S3`: non-product media, backups, optional upload staging
- `CloudWatch`: logs and alerting
- `Secrets Manager`: Shopify tokens and other secrets

### Optional AWS services

- `DynamoDB`: custom site content not stored in Shopify
- `EventBridge` or `SQS`: async processing for webhook events
- `SES`: transactional email outside Shopify, if ever needed

## Recommended AWS services for custom commerce

- `AWS Amplify Hosting`
- `Route 53`
- `AWS Certificate Manager`
- `Amazon Cognito`
- `API Gateway`
- `Lambda`
- `DynamoDB` or `Aurora PostgreSQL`
- `S3`
- `CloudWatch`
- `Secrets Manager`

### Database recommendation if custom commerce

- choose `DynamoDB` if we want a leaner serverless backend with simple access patterns
- choose `Aurora PostgreSQL` if we want stronger relational querying for products, orders, and admin reporting

## Suggested Phase Plan

## Phase 1: Architecture decision

- choose `Shopify-first` or `Custom + Stripe`
- decide whether Apple sign-in is a launch requirement
- decide whether `Process` and `Exhibitions` stay as brand/story pages

## Phase 2: Information architecture

- map final site navigation
- define required storefront pages
- define product detail fields
- define account and order pages

## Phase 3: Commerce backend setup

### Shopify-first

- create Shopify store
- model products / collections / inventory
- configure customer accounts
- configure shipping and fulfillment workflow
- configure payments

### Custom + Stripe

- create Cognito user pool
- create product/order schema
- set up Stripe checkout flow
- define shipping integration path
- build admin CRUD endpoints

## Phase 4: Frontend storefront implementation

- replace current artwork routes with shop/collection/product/cart/account flows
- add real cart state
- add account pages
- add order history / tracking page

## Phase 5: Admin and operations

- define admin role model
- implement product publishing workflow
- add image upload flow
- add fulfillment/tracking workflow

## Phase 6: AWS deployment

- deploy frontend to Amplify
- connect domain through Route 53
- configure TLS
- add SPA rewrites
- deploy API/Lambda backend
- configure secrets and logging

## Immediate Next Steps

1. Decide whether launch priority is `fastest storefront` or `full custom auth/control`.
2. Decide whether `Sign in with Apple` is mandatory for launch.
3. If fastest storefront wins, commit to `Shopify-first`.
4. If Apple sign-in is mandatory and Shopify Plus is not desired, commit to `Custom + Stripe + Cognito`.
5. Once the stack is chosen, rewrite the current route map and data model around products, cart, checkout, account, and fulfillment.

## Current Recommendation

Unless Apple sign-in is a hard launch requirement, choose:

- `Shopify-first`
- `AWS Amplify Hosting + API Gateway + Lambda + Secrets Manager + CloudWatch`
- keep AWS as the integration layer, not the primary commerce engine

That gets the ceramics store live sooner and avoids rebuilding products, orders, fulfillment, and admin from scratch.

## Source Notes

This plan is based on current official docs reviewed on March 12, 2026:

- AWS Amplify Hosting docs: custom domains, rewrites/redirects, manual deploys
- Amazon Cognito docs: social identity providers including Google and Apple
- Shopify docs: customer accounts, Google/Facebook social sign-in, order status pages, tracking, fulfillment flows, GraphQL Admin / Customer APIs
- Stripe docs: Checkout Sessions and Payment Element guidance
