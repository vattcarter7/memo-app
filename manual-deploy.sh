echo "Pulling..."
git reset --hard
git checkout main
git pull origin main

echo "Building..."
docker-compose up -d --build