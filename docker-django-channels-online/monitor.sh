#!/bin/bash
command -v tmux >/dev/null 2>&1 || { echo >&2 "I require tmux but it's not installed.  Aborting."; exit 1; }

tmux new-session \; \
 split-window -v \; \
 split-window -h \; \
 select-pane -t 0 \; \
 split-window -h \; \
 split-window -h \; \
 send-keys 'docker-compose run db' C-m \; \
 select-pane -t 4 \; \
 send-keys 'docker-compose run django' C-m \; \
 select-pane -t 3 \; \
 send-keys 'docker-compose run redis-server' C-m \; \
 select-pane -t 0 \; \
 send-keys 'docker-compose run celery-tasks' C-m \; \
 select-pane -t 1 \; \
 send-keys 'docker-compose run celery-beat' C-m \; \