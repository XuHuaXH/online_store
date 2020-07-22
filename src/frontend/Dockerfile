FROM ubuntu:18.04
RUN apt-get update \
&& apt-get install -y nodejs \
&& apt-get install -y npm


WORKDIR /src/frontend
COPY package.json /src/frontend
RUN npm install -g npm@latest
RUN npm i --package-lock-only
RUN npm install
RUN npm install axios
RUN npm install @chakra-ui/core @emotion/core @emotion/styled emotion-theming
RUN npm install react-router-dom
COPY . /src/frontend
EXPOSE 3000
CMD ["npm", "start"]
