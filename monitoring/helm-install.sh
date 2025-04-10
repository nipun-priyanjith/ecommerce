#!/bin/bash

# Install Helm
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Add Prometheus Helm repo
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Install Prometheus + Grafana Stack
helm install kube-prometheus-stack prometheus-community/kube-prometheus-stack

# Optional: Expose Grafana as NodePort
kubectl patch svc kube-prometheus-stack-grafana -n default -p '{"spec": {"type": "NodePort"}}'

# Print Grafana Password
echo "Grafana Password:"
kubectl get secret kube-prometheus-stack-grafana -n default -o jsonpath="{.data.admin-password}" | base64 -d ; echo
