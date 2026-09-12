import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface DispatchRequest {
  requestId: string;
  serviceType: string;
  latitude: number;
  longitude: number;
  searchRadiusKm: number;
  customerRating?: number;
  isEmergency?: boolean;
}

export interface ProviderScore {
  providerId: string;
  score: number;
  eta: number;
  distance: number;
  reliability: number;
  rating: number;
}

@Injectable()
export class DispatchService {
  constructor(private configService: ConfigService) {}

  /**
   * Calculate provider matching score based on multiple factors
   * Weights are configurable via environment variables
   */
  calculateScore(provider: any, request: DispatchRequest): ProviderScore {
    const etaWeight = parseFloat(this.configService.get('DISPATCH_SCORING_ETA_WEIGHT', '0.30'));
    const distanceWeight = parseFloat(
      this.configService.get('DISPATCH_SCORING_DISTANCE_WEIGHT', '0.20'),
    );
    const reliabilityWeight = parseFloat(
      this.configService.get('DISPATCH_SCORING_RELIABILITY_WEIGHT', '0.20'),
    );
    const ratingWeight = parseFloat(this.configService.get('DISPATCH_SCORING_RATING_WEIGHT', '0.15'));
    const priceWeight = parseFloat(this.configService.get('DISPATCH_SCORING_PRICE_WEIGHT', '0.10'));
    const acceptanceWeight = parseFloat(
      this.configService.get('DISPATCH_SCORING_ACCEPTANCE_WEIGHT', '0.05'),
    );

    // Normalized scores (0-1 scale)
    const etaScore = this.normalizeETA(provider.eta);
    const distanceScore = this.normalizeDistance(provider.distance, request.searchRadiusKm);
    const reliabilityScore = provider.reliabilityScore / 100;
    const ratingScore = provider.averageRating / 5;
    const priceScore = this.normalizePricing(provider, request);
    const acceptanceScore = provider.acceptanceRate / 100;

    const totalScore =
      etaScore * etaWeight +
      distanceScore * distanceWeight +
      reliabilityScore * reliabilityWeight +
      ratingScore * ratingWeight +
      priceScore * priceWeight +
      acceptanceScore * acceptanceWeight;

    return {
      providerId: provider.id,
      score: Math.min(1, Math.max(0, totalScore)),
      eta: provider.eta,
      distance: provider.distance,
      reliability: provider.reliabilityScore,
      rating: provider.averageRating,
    };
  }

  private normalizeETA(eta: number): number {
    // Assuming max acceptable ETA is 45 minutes
    const maxETA = 45;
    return Math.max(0, 1 - eta / maxETA);
  }

  private normalizeDistance(distance: number, maxRadius: number): number {
    return Math.max(0, 1 - distance / maxRadius);
  }

  private normalizePricing(provider: any, request: DispatchRequest): number {
    // Providers with competitive pricing score higher
    // This can be enhanced with market analysis
    return 0.5; // Neutral baseline
  }
}
