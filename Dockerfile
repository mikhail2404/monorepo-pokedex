# This is the base dockerfile. Here the base image is pulled and the ras setup is done for the project.
# Make sure to include the base setup for lerna here.
FROM node:16 as base
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./lerna.json ./

# Package components
FROM base as components-build
WORKDIR /app/packages/components
# Here the dependencies will be installed and the local required packages bootstrapped.
# The --slim flag will cause the package json to only include the dependencies, so not all changes to the package json cause docker to reinstall all packages.
COPY packages/components/package-slim.json package.json
WORKDIR /app
RUN npx lerna bootstrap --scope=components --includeDependencies
WORKDIR /app/packages/components
# The normal package.json should be copied after the install into the container
COPY packages/components/package.json ./
# This will only add the command to the dockerfile if the build script exists in the package otherwise it's ignored.

# Package utils
FROM base as utils-build
WORKDIR /app/packages/utils
# Here the dependencies will be installed and the local required packages bootstrapped.
# The --slim flag will cause the package json to only include the dependencies, so not all changes to the package json cause docker to reinstall all packages.
COPY packages/utils/package-slim.json package.json
WORKDIR /app
RUN npx lerna bootstrap --scope=utils --includeDependencies
WORKDIR /app/packages/utils
# The normal package.json should be copied after the install into the container
COPY packages/utils/package.json ./
# This will only add the command to the dockerfile if the build script exists in the package otherwise it's ignored.

# Package pokedex
FROM base as pokedex-build
WORKDIR /pokedex
# Here the dependencies will be installed and the local required packages bootstrapped.
# The --slim flag will cause the package json to only include the dependencies, so not all changes to the package json cause docker to reinstall all packages.
COPY packages/pokedex/package-slim.json package.json
WORKDIR /app
COPY --from=components-build /app/packages/components/package.json /app/packages/components/
COPY --from=utils-build /app/packages/utils/package.json /app/packages/utils/
RUN npx lerna bootstrap --scope=pokedex --includeDependencies
COPY --from=components-build /app/packages/components/ /app/packages/components/
COPY --from=utils-build /app/packages/utils/ /app/packages/utils/
WORKDIR /pokedex
# The normal package.json should be copied after the install into the container
COPY packages/pokedex/package.json ./
# This will only add the command to the dockerfile if the build script exists in the package otherwise it's ignored.
RUN npm run build

# Final stage
FROM base
COPY --from=components-build /app/packages/components /app/packages/components
COPY --from=utils-build /app/packages/utils /app/packages/utils
COPY --from=pokedex-build /pokedex /pokedex