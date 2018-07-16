#!/bin/bash
cd /home/kostysh/pyrrha
sudo git reset --hard
sudo git pull
sudo docker-compose pull
sudo docker-compose down
sudo docker-compose up -d
echo "Done, pyrrha-boxplorer has been deployed successfully."
exit
