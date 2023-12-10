FROM node:18.17.0 as base

RUN curl -L https://unpkg.com/@pnpm/self-installer | node

# All deps stage
FROM base as deps
WORKDIR /app
ADD package.json pnpm-lock.yaml .
RUN pnpm install 

# Production only deps stage
FROM base as production-deps
WORKDIR /app
ADD package.json pnpm-lock.yaml .
RUN pnpm install 
RUN wget https://gobinaries.com/tj/node-prune --output-document - | /bin/sh && node-prune

# Build stage
FROM base as build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN node ace build --production --ignore-ts-errors

# Production stage
FROM base
ENV NODE_ENV=production
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
EXPOSE 3333
COPY start.sh /app/start.sh
CMD ["/bin/sh", "/app/start.sh"]