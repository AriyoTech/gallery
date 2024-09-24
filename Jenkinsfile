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
        stage('Install npm Packages') {
            steps {
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
        stage('Npm Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Deploy to Render122') {
            steps {
                script {
                    def response = sh(script: """
                        curl -X POST ${DEPLOY_HOOK_URL}
                    """, returnStdout: true).trim()
                   
                    echo "Deployment Response: ${response}"
                }
            }

               /* CORRECT */
               // sh('curl -u $EXAMPLE_CREDS_USR:$EXAMPLE_CREDS_PSW https://example.com/')
        }
        stage('Deploy to Render') {
            steps {
                script {
                    def response = sh(script: """
                        curl -X POST ${RENDER_URL} \
                        -H "Authorization: Bearer ${RENDER_API_KEY}" \
                        -H "Content-Type: application/json" \
                        -d '{
                            "serviceId": "${SERVICE_ID}"
                        }'
                    """, returnStdout: true).trim()
                   
                    echo "Deployment Response: ${response}"
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

        stage('Run Application') {
            steps {
                sh 'nohup node server.js &'
            }
        }
    }
}