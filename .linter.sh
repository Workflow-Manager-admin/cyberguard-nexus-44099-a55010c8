#!/bin/bash
cd /home/kavia/workspace/code-generation/cyberguard-nexus-44099-a55010c8/echoguard_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

