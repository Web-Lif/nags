FROM node:19-alpine as builder

COPY ./ /root/nags/
WORKDIR /root/nags/
RUN  npm ci && npm run build

FROM alpine:latest 
WORKDIR /root/
COPY --from=builder /root/nags/binary/nags-linux /root/nags-linux
EXPOSE 80

CMD ["/root/nags-linux"]
