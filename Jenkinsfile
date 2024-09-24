pipeline {
    agent any
    tools {
        nodejs 'NodeJS 22.9.0' // Ensure this name matches your Global Tool Configuration
    }
    environment {
        DEPLOY_HOOK_URL = 'https://api.render.com/deploy/srv-crotab52ng1s73akaeug?key=YUmxMvTboHM' 
      
    }

    stages {
        stage('Node Version') {
            steps {
                echo 'Checking Node.js version...'
                sh 'node --version'
            }
        }
        stage('Clone repo') {
            steps {
                echo 'Clone this repository...'
                git credentialsId: 'AriyoTech', url: 'https://github.com/AriyoTech/gallery.git'
            }
        }
        stage('Install Npm') {
            steps {
                echo 'Installing npm packages...'
                sh 'npm install'
                sh 'npm install mongodb'
                sh 'npm install -g webpack'
            }
        }
        stage('Build') {
                   steps {
                echo 'Running the build...'
                sh 'npm run build'
            }
        }
      //  stage('Test') {
    //       steps {
    //            echo 'Running tests...'
      //          sh 'npm test'
    //        }
        }
        stage('Deploying to Render122') {
                        steps {
                            script {
                                def response = sh(script: """
                                    curl -X POST ${DEPLOY_HOOK_URL}
                                """, returnStdout: true).trim()
                                
                                echo "Deploying Response: ${response}"
                            }
                        }

                    }
                    stage('sending message to slack'){
                        steps{
                            slackSend(
                    botUser: true, 
                    channel: 'C07N2N36TTR', 
                    color: '#0000FF',  
                    message: "Deployment successful! Build ID - ${env.BUILD_ID}. Check the deployed site: https://gallery-1-9soh.onrender.com", 
                    teamDomain: 'Gideon_Ip1', 
                    tokenCredentialId: 'JenkinsGideon'
                )

                        }
                    }
                    
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}