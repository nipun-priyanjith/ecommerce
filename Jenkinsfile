pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = "dockerhub-credentials-id"
        BITBUCKET_CREDENTIALS_ID = "bitbucket_auth"
        DOCKER_IMAGE_PREFIX = ""
        ROCKYLINUX_SERVER = "192.168.88.131"
        ROCKYLINUX_SSH_CREDENTIALS = "rocky-ssh"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', credentialsId: BITBUCKET_CREDENTIALS_ID, url: 'github repo url'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    def services = ['client', 'server', 'ml', 'cpy']
                    for (service in services) {
                        sh "docker build -t ${DOCKER_IMAGE_PREFIX}/${service}:${BUILD_NUMBER} ./${service}"
                    }
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh "echo '${DOCKER_PASS}' | docker login -u '${DOCKER_USER}' --password-stdin"
                    }
                }
            }
        }

        stage('Push Docker Images to Docker Hub') {
            steps {
                script {
                    def services = ['client', 'server', 'ml', 'cpy']
                    for (service in services) {
                        sh "docker push ${DOCKER_IMAGE_PREFIX}/${service}:${BUILD_NUMBER}"
                    }
                }
            }
        }

       stage('Deploy to Kubernetes') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'k8s-master-password', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh """
                        sshpass -p '${PASS}' scp -o StrictHostKeyChecking=no k8s/*.yml ${USER}@192.168.88.133:/home/${USER}/final-project/

                        sshpass -p '${PASS}' ssh -tt -o StrictHostKeyChecking=no ${USER}@192.168.88.133 '
                            kubectl apply -f /home/${USER}/final-project/deployment.yml &&
                            kubectl apply -f /home/${USER}/final-project/service.yml &&
                            kubectl set image deployment/client-deployment client=${DOCKER_IMAGE_PREFIX}/client:${BUILD_NUMBER} &&
                            kubectl set image deployment/server-deployment server=${DOCKER_IMAGE_PREFIX}/server:${BUILD_NUMBER} &&
                            kubectl set image deployment/ml-deployment ml=${DOCKER_IMAGE_PREFIX}/ml:${BUILD_NUMBER} &&
                            kubectl set image deployment/cpy-deployment cpy=${DOCKER_IMAGE_PREFIX}/cpy:${BUILD_NUMBER} &&
                            kubectl rollout status deployment/client-deployment &&
                            kubectl rollout status deployment/server-deployment &&
                            kubectl rollout status deployment/ml-deployment &&
                            kubectl rollout status deployment/cpy-deployment
                        '
                    """
                }
            }
        }
    }

    post {
        always {
            sh "docker logout"
        }
        success {
            echo "Deployment successful!"
        }
        failure {
            echo "Deployment failed. Please check logs."
        }
    }
}
