import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PaginateResult } from '@dragonfish/models/util';
import { SearchService } from '../../../services/utility';
import { calculateApprovalRating } from '@dragonfish/utilities/functions';
import { ContentModel } from '@dragonfish/models/content';

@Component({
    selector: 'app-find-works',
    templateUrl: './find-works.component.html',
    styleUrls: ['./find-works.component.less'],
})
export class FindWorksComponent implements OnInit {
    results: PaginateResult<ContentModel>;
    query: string;
    pageNum = 1;
    constructor(private searchService: SearchService, public route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.route.queryParamMap.subscribe((params) => {
            if (params.get('query') !== null && params.get('page') === null) {
                this.query = params.get('query');
                this.fetchData(this.query, this.pageNum);
            } else if (params.get('query') !== null && params.get('page') !== null) {
                this.query = params.get('query');
                this.pageNum = +params.get('page');
                this.fetchData(this.query, this.pageNum);
            }
        });
    }

    fetchData(query: string, pageNum: number) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { query: query, page: pageNum },
            queryParamsHandling: 'merge',
        });
        this.searchService.fetchWorks(query, pageNum).subscribe((results) => {
            this.results = results;
            this.pageNum = pageNum;
        });
    }

    /**
     * Calculates a work's approval rating.
     */
    calcApprovalRating(likes: number, dislikes: number) {
        return calculateApprovalRating(likes, dislikes);
    }
}
