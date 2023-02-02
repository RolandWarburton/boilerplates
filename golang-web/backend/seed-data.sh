#!/usr/bin/env zsh

# requires httpie
# https://httpie.io/

# remember to remove the authentication requirements by editing app.go (look for "middleware")

# accounts
USER1=`http --json POST localhost:3000/account username='roland' password='password' | jq -r ".result.id"`
USER2=`http --json POST localhost:3000/account username='rinne' password='password' | jq -r ".result.id"`

