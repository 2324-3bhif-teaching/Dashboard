kubectl delete -n student-s-alesi deployment robodashboard
kubectl delete -n student-s-alesi service robodashboard-svc
kubectl delete -n student-s-alesi ingress robodashboard-ingress
kubectl delete -n student-s-alesi pod -l app=robodashboard
kubectl create -f leocloud-deploy-V2.yaml