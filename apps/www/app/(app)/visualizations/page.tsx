import { THEMES } from "@/lib/themes"
import { ChartDisplay } from "@/components/chart-display"
import { ThemesSwitcher } from "@/components/themes-selector"
import { ThemesStyle } from "@/components/themes-styles"
import * as Charts from "@/registry/default/g2"

export default function ChartsPage() {
  return (
    <div className="grid gap-4">
      <ThemesStyle />
      <div className="gap-6 md:flex md:flex-row-reverse md:items-start">
        <ThemesSwitcher
          themes={THEMES}
          className="bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed inset-x-0 bottom-0 z-40 flex backdrop-blur lg:sticky lg:bottom-auto lg:top-20"
        />
        <div className="grid flex-1 gap-12">
          <h2 className="sr-only">Examples</h2>
          <div
            id="examples"
            className="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
          >
            <Charts.G2ChartComponent_accessible_text_searching_text_search />
            <ChartDisplay name="accessible-text-searching-text-search" title="Accessible Text Searching Text Search">
              <Charts.G2ChartComponent_accessible_text_searching_text_search />
            </ChartDisplay>
            <ChartDisplay name="algorithm-sort-bubble-sort" title="Algorithm Sort Bubble Sort">
              <Charts.G2ChartComponent_algorithm_sort_bubble_sort />
            </ChartDisplay>
            <ChartDisplay name="algorithm-sort-insertion-sort" title="Algorithm Sort Insertion Sort">
              <Charts.G2ChartComponent_algorithm_sort_insertion_sort />
            </ChartDisplay>
            <ChartDisplay name="algorithm-sort-selection-sort" title="Algorithm Sort Selection Sort">
              <Charts.G2ChartComponent_algorithm_sort_selection_sort />
            </ChartDisplay>
            <ChartDisplay name="analysis-bin-bin-color" title="Analysis Bin Bin Color">
              <Charts.G2ChartComponent_analysis_bin_bin_color />
            </ChartDisplay>
            <ChartDisplay name="analysis-bin-bin-opacity" title="Analysis Bin Bin Opacity">
              <Charts.G2ChartComponent_analysis_bin_bin_opacity />
            </ChartDisplay>
            <ChartDisplay name="analysis-bin-bin-size" title="Analysis Bin Bin Size">
              <Charts.G2ChartComponent_analysis_bin_bin_size />
            </ChartDisplay>
            <ChartDisplay name="analysis-bin-binx" title="Analysis Bin Binx">
              <Charts.G2ChartComponent_analysis_bin_binx />
            </ChartDisplay>
            <ChartDisplay name="analysis-bin-binx-color" title="Analysis Bin Binx Color">
              <Charts.G2ChartComponent_analysis_bin_binx_color />
            </ChartDisplay>
            <ChartDisplay name="analysis-bin-poisson" title="Analysis Bin Poisson">
              <Charts.G2ChartComponent_analysis_bin_poisson />
            </ChartDisplay>
            <ChartDisplay name="analysis-group-bar-aggregated" title="Analysis Group Bar Aggregated">
              <Charts.G2ChartComponent_analysis_group_bar_aggregated />
            </ChartDisplay>
            <ChartDisplay name="analysis-group-bar-aggregated-normalized-stacked" title="Analysis Group Bar Aggregated Normalized Stacked">
              <Charts.G2ChartComponent_analysis_group_bar_aggregated_normalized_stacked />
            </ChartDisplay>
            <ChartDisplay name="analysis-group-bar-aggregated-stacked" title="Analysis Group Bar Aggregated Stacked">
              <Charts.G2ChartComponent_analysis_group_bar_aggregated_stacked />
            </ChartDisplay>
            <ChartDisplay name="analysis-group-bar-aggregated-with-label" title="Analysis Group Bar Aggregated With Label">
              <Charts.G2ChartComponent_analysis_group_bar_aggregated_with_label />
            </ChartDisplay>
            <ChartDisplay name="analysis-group-bar-layered" title="Analysis Group Bar Layered">
              <Charts.G2ChartComponent_analysis_group_bar_layered />
            </ChartDisplay>
            <ChartDisplay name="analysis-group-bar-multi-measure" title="Analysis Group Bar Multi Measure">
              <Charts.G2ChartComponent_analysis_group_bar_multi_measure />
            </ChartDisplay>
            <ChartDisplay name="analysis-group-bar-stacked-diverging" title="Analysis Group Bar Stacked Diverging">
              <Charts.G2ChartComponent_analysis_group_bar_stacked_diverging />
            </ChartDisplay>
            <ChartDisplay name="analysis-group-bar-stacked-normalized-1d" title="Analysis Group Bar Stacked Normalized 1d">
              <Charts.G2ChartComponent_analysis_group_bar_stacked_normalized_1d />
            </ChartDisplay>
            <ChartDisplay name="analysis-regression-exponential-regression" title="Analysis Regression Exponential Regression">
              <Charts.G2ChartComponent_analysis_regression_exponential_regression />
            </ChartDisplay>
            <ChartDisplay name="analysis-regression-linear-regression" title="Analysis Regression Linear Regression">
              <Charts.G2ChartComponent_analysis_regression_linear_regression />
            </ChartDisplay>
            <ChartDisplay name="analysis-regression-logarithmic-regression" title="Analysis Regression Logarithmic Regression">
              <Charts.G2ChartComponent_analysis_regression_logarithmic_regression />
            </ChartDisplay>
            <ChartDisplay name="analysis-regression-polynomial-regression" title="Analysis Regression Polynomial Regression">
              <Charts.G2ChartComponent_analysis_regression_polynomial_regression />
            </ChartDisplay>
            <ChartDisplay name="analysis-regression-quadratic-regression" title="Analysis Regression Quadratic Regression">
              <Charts.G2ChartComponent_analysis_regression_quadratic_regression />
            </ChartDisplay>
            <ChartDisplay name="animation-general-fade" title="Animation General Fade">
              <Charts.G2ChartComponent_animation_general_fade />
            </ChartDisplay>
            <ChartDisplay name="animation-general-path-in" title="Animation General Path In">
              <Charts.G2ChartComponent_animation_general_path_in />
            </ChartDisplay>
            <ChartDisplay name="animation-general-scale-x" title="Animation General Scale X">
              <Charts.G2ChartComponent_animation_general_scale_x />
            </ChartDisplay>
            <ChartDisplay name="animation-general-scale-y" title="Animation General Scale Y">
              <Charts.G2ChartComponent_animation_general_scale_y />
            </ChartDisplay>
            <ChartDisplay name="animation-general-wave-in" title="Animation General Wave In">
              <Charts.G2ChartComponent_animation_general_wave_in />
            </ChartDisplay>
            <ChartDisplay name="animation-general-zoom-in" title="Animation General Zoom In">
              <Charts.G2ChartComponent_animation_general_zoom_in />
            </ChartDisplay>
            <ChartDisplay name="animation-group-area" title="Animation Group Area">
              <Charts.G2ChartComponent_animation_group_area />
            </ChartDisplay>
            <ChartDisplay name="animation-group-interval" title="Animation Group Interval">
              <Charts.G2ChartComponent_animation_group_interval />
            </ChartDisplay>
            <ChartDisplay name="animation-group-interval-polar" title="Animation Group Interval Polar">
              <Charts.G2ChartComponent_animation_group_interval_polar />
            </ChartDisplay>
            <ChartDisplay name="animation-group-line" title="Animation Group Line">
              <Charts.G2ChartComponent_animation_group_line />
            </ChartDisplay>
            <ChartDisplay name="animation-group-point" title="Animation Group Point">
              <Charts.G2ChartComponent_animation_group_point />
            </ChartDisplay>
            <ChartDisplay name="animation-lottie-lottie" title="Animation Lottie Lottie">
              <Charts.G2ChartComponent_animation_lottie_lottie />
            </ChartDisplay>
            <ChartDisplay name="annotation-connector-interval-connector" title="Annotation Connector Interval Connector">
              <Charts.G2ChartComponent_annotation_connector_interval_connector />
            </ChartDisplay>
            <ChartDisplay name="annotation-connector-revenue-flow-waterfall" title="Annotation Connector Revenue Flow Waterfall">
              <Charts.G2ChartComponent_annotation_connector_revenue_flow_waterfall />
            </ChartDisplay>
            <ChartDisplay name="annotation-line-anomaly-area-line" title="Annotation Line Anomaly Area Line">
              <Charts.G2ChartComponent_annotation_line_anomaly_area_line />
            </ChartDisplay>
            <ChartDisplay name="annotation-line-histogram-mean-line" title="Annotation Line Histogram Mean Line">
              <Charts.G2ChartComponent_annotation_line_histogram_mean_line />
            </ChartDisplay>
            <ChartDisplay name="annotation-line-interval-mean-line" title="Annotation Line Interval Mean Line">
              <Charts.G2ChartComponent_annotation_line_interval_mean_line />
            </ChartDisplay>
            <ChartDisplay name="annotation-line-interval-threshold" title="Annotation Line Interval Threshold">
              <Charts.G2ChartComponent_annotation_line_interval_threshold />
            </ChartDisplay>
            <ChartDisplay name="annotation-line-point-line" title="Annotation Line Point Line">
              <Charts.G2ChartComponent_annotation_line_point_line />
            </ChartDisplay>
            <ChartDisplay name="annotation-line-point-point" title="Annotation Line Point Point">
              <Charts.G2ChartComponent_annotation_line_point_point />
            </ChartDisplay>
            <ChartDisplay name="annotation-line-quadrant-scatter" title="Annotation Line Quadrant Scatter">
              <Charts.G2ChartComponent_annotation_line_quadrant_scatter />
            </ChartDisplay>
            <ChartDisplay name="annotation-range-bar-range" title="Annotation Range Bar Range">
              <Charts.G2ChartComponent_annotation_range_bar_range />
            </ChartDisplay>
            <ChartDisplay name="annotation-range-line-range" title="Annotation Range Line Range">
              <Charts.G2ChartComponent_annotation_range_line_range />
            </ChartDisplay>
            <ChartDisplay name="annotation-range-point-range" title="Annotation Range Point Range">
              <Charts.G2ChartComponent_annotation_range_point_range />
            </ChartDisplay>
            <ChartDisplay name="annotation-shape-interval-point" title="Annotation Shape Interval Point">
              <Charts.G2ChartComponent_annotation_shape_interval_point />
            </ChartDisplay>
            <ChartDisplay name="annotation-shape-line-badge" title="Annotation Shape Line Badge">
              <Charts.G2ChartComponent_annotation_shape_line_badge />
            </ChartDisplay>
            <ChartDisplay name="annotation-shape-watermark" title="Annotation Shape Watermark">
              <Charts.G2ChartComponent_annotation_shape_watermark />
            </ChartDisplay>
            <ChartDisplay name="annotation-text-line-text" title="Annotation Text Line Text">
              <Charts.G2ChartComponent_annotation_text_line_text />
            </ChartDisplay>
            <ChartDisplay name="annotation-text-peak-value-text" title="Annotation Text Peak Value Text">
              <Charts.G2ChartComponent_annotation_text_peak_value_text />
            </ChartDisplay>
            <ChartDisplay name="component-axis-axis" title="Component Axis Axis">
              <Charts.G2ChartComponent_component_axis_axis />
            </ChartDisplay>
            <ChartDisplay name="component-axis-axis-multi" title="Component Axis Axis Multi">
              <Charts.G2ChartComponent_component_axis_axis_multi />
            </ChartDisplay>
            <ChartDisplay name="component-axis-axis-polar" title="Component Axis Axis Polar">
              <Charts.G2ChartComponent_component_axis_axis_polar />
            </ChartDisplay>
            <ChartDisplay name="component-axis-axis-x" title="Component Axis Axis X">
              <Charts.G2ChartComponent_component_axis_axis_x />
            </ChartDisplay>
            <ChartDisplay name="component-axis-axis-xy" title="Component Axis Axis Xy">
              <Charts.G2ChartComponent_component_axis_axis_xy />
            </ChartDisplay>
            <ChartDisplay name="component-label-contrastreverse" title="Component Label Contrastreverse">
              <Charts.G2ChartComponent_component_label_contrastreverse />
            </ChartDisplay>
            <ChartDisplay name="component-label-htmllabel" title="Component Label Htmllabel">
              <Charts.G2ChartComponent_component_label_htmllabel />
            </ChartDisplay>
            <ChartDisplay name="component-label-overflowhide" title="Component Label Overflowhide">
              <Charts.G2ChartComponent_component_label_overflowhide />
            </ChartDisplay>
            <ChartDisplay name="component-label-overlaphide" title="Component Label Overlaphide">
              <Charts.G2ChartComponent_component_label_overlaphide />
            </ChartDisplay>
            <ChartDisplay name="component-legend-category" title="Component Legend Category">
              <Charts.G2ChartComponent_component_legend_category />
            </ChartDisplay>
            <ChartDisplay name="component-legend-continuous" title="Component Legend Continuous">
              <Charts.G2ChartComponent_component_legend_continuous />
            </ChartDisplay>
            <ChartDisplay name="component-legend-custom" title="Component Legend Custom">
              <Charts.G2ChartComponent_component_legend_custom />
            </ChartDisplay>
            <ChartDisplay name="component-legend-item-style" title="Component Legend Item Style">
              <Charts.G2ChartComponent_component_legend_item_style />
            </ChartDisplay>
            <ChartDisplay name="component-legend-nav-style" title="Component Legend Nav Style">
              <Charts.G2ChartComponent_component_legend_nav_style />
            </ChartDisplay>
            <ChartDisplay name="component-legend-position" title="Component Legend Position">
              <Charts.G2ChartComponent_component_legend_position />
            </ChartDisplay>
            <ChartDisplay name="component-legend-symbol" title="Component Legend Symbol">
              <Charts.G2ChartComponent_component_legend_symbol />
            </ChartDisplay>
            <ChartDisplay name="component-legend-title" title="Component Legend Title">
              <Charts.G2ChartComponent_component_legend_title />
            </ChartDisplay>
            <ChartDisplay name="component-scrollbar-scrollbar" title="Component Scrollbar Scrollbar">
              <Charts.G2ChartComponent_component_scrollbar_scrollbar />
            </ChartDisplay>
            <ChartDisplay name="component-title-title" title="Component Title Title">
              <Charts.G2ChartComponent_component_title_title />
            </ChartDisplay>
            <ChartDisplay name="component-title-title-style" title="Component Title Title Style">
              <Charts.G2ChartComponent_component_title_title_style />
            </ChartDisplay>
            <ChartDisplay name="component-tooltip-tooltip" title="Component Tooltip Tooltip">
              <Charts.G2ChartComponent_component_tooltip_tooltip />
            </ChartDisplay>
            <ChartDisplay name="component-tooltip-tooltip2d" title="Component Tooltip Tooltip2d">
              <Charts.G2ChartComponent_component_tooltip_tooltip2d />
            </ChartDisplay>
            <ChartDisplay name="component-tooltip-tooltip-click" title="Component Tooltip Tooltip Click">
              <Charts.G2ChartComponent_component_tooltip_tooltip_click />
            </ChartDisplay>
            <ChartDisplay name="component-tooltip-tooltip-click-line" title="Component Tooltip Tooltip Click Line">
              <Charts.G2ChartComponent_component_tooltip_tooltip_click_line />
            </ChartDisplay>
            <ChartDisplay name="component-tooltip-tooltip-crosshairs" title="Component Tooltip Tooltip Crosshairs">
              <Charts.G2ChartComponent_component_tooltip_tooltip_crosshairs />
            </ChartDisplay>
            <ChartDisplay name="component-tooltip-tooltip-custom" title="Component Tooltip Tooltip Custom">
              <Charts.G2ChartComponent_component_tooltip_tooltip_custom />
            </ChartDisplay>
            <ChartDisplay name="component-tooltip-tooltip-line-marker" title="Component Tooltip Tooltip Line Marker">
              <Charts.G2ChartComponent_component_tooltip_tooltip_line_marker />
            </ChartDisplay>
            <ChartDisplay name="component-tooltip-tooltip-marker" title="Component Tooltip Tooltip Marker">
              <Charts.G2ChartComponent_component_tooltip_tooltip_marker />
            </ChartDisplay>
            <ChartDisplay name="component-tooltip-tooltip-render" title="Component Tooltip Tooltip Render">
              <Charts.G2ChartComponent_component_tooltip_tooltip_render />
            </ChartDisplay>
            <ChartDisplay name="component-tooltip-tooltip-series" title="Component Tooltip Tooltip Series">
              <Charts.G2ChartComponent_component_tooltip_tooltip_series />
            </ChartDisplay>
            <ChartDisplay name="component-tooltip-tooltip-style" title="Component Tooltip Tooltip Style">
              <Charts.G2ChartComponent_component_tooltip_tooltip_style />
            </ChartDisplay>
            <ChartDisplay name="component-tooltip-tooltip-two" title="Component Tooltip Tooltip Two">
              <Charts.G2ChartComponent_component_tooltip_tooltip_two />
            </ChartDisplay>
            <ChartDisplay name="composition-facet-circle" title="Composition Facet Circle">
              <Charts.G2ChartComponent_composition_facet_circle />
            </ChartDisplay>
            <ChartDisplay name="composition-facet-rect" title="Composition Facet Rect">
              <Charts.G2ChartComponent_composition_facet_rect />
            </ChartDisplay>
            <ChartDisplay name="composition-facet-rect-bar" title="Composition Facet Rect Bar">
              <Charts.G2ChartComponent_composition_facet_rect_bar />
            </ChartDisplay>
            <ChartDisplay name="composition-facet-rect-col" title="Composition Facet Rect Col">
              <Charts.G2ChartComponent_composition_facet_rect_col />
            </ChartDisplay>
            <ChartDisplay name="composition-facet-rect-frame" title="Composition Facet Rect Frame">
              <Charts.G2ChartComponent_composition_facet_rect_frame />
            </ChartDisplay>
            <ChartDisplay name="composition-facet-rect-pie" title="Composition Facet Rect Pie">
              <Charts.G2ChartComponent_composition_facet_rect_pie />
            </ChartDisplay>
            <ChartDisplay name="composition-facet-rect-row" title="Composition Facet Rect Row">
              <Charts.G2ChartComponent_composition_facet_rect_row />
            </ChartDisplay>
            <ChartDisplay name="composition-repeat-matrix" title="Composition Repeat Matrix">
              <Charts.G2ChartComponent_composition_repeat_matrix />
            </ChartDisplay>
            <ChartDisplay name="composition-repeat-matrix-col" title="Composition Repeat Matrix Col">
              <Charts.G2ChartComponent_composition_repeat_matrix_col />
            </ChartDisplay>
            <ChartDisplay name="composition-space-space-flex" title="Composition Space Space Flex">
              <Charts.G2ChartComponent_composition_space_space_flex />
            </ChartDisplay>
            <ChartDisplay name="composition-space-space-layer" title="Composition Space Space Layer">
              <Charts.G2ChartComponent_composition_space_space_layer />
            </ChartDisplay>
            <ChartDisplay name="expr-base-expr" title="Expr Base Expr">
              <Charts.G2ChartComponent_expr_base_expr />
            </ChartDisplay>
            <ChartDisplay name="general-area-area" title="General Area Area">
              <Charts.G2ChartComponent_general_area_area />
            </ChartDisplay>
            <ChartDisplay name="general-area-area-band" title="General Area Area Band">
              <Charts.G2ChartComponent_general_area_area_band />
            </ChartDisplay>
            <ChartDisplay name="general-area-area-basic" title="General Area Area Basic">
              <Charts.G2ChartComponent_general_area_area_basic />
            </ChartDisplay>
            <ChartDisplay name="general-area-area-difference" title="General Area Area Difference">
              <Charts.G2ChartComponent_general_area_area_difference />
            </ChartDisplay>
            <ChartDisplay name="general-area-area-gradient" title="General Area Area Gradient">
              <Charts.G2ChartComponent_general_area_area_gradient />
            </ChartDisplay>
            <ChartDisplay name="general-area-area-percentage" title="General Area Area Percentage">
              <Charts.G2ChartComponent_general_area_area_percentage />
            </ChartDisplay>
            <ChartDisplay name="general-area-area-range" title="General Area Area Range">
              <Charts.G2ChartComponent_general_area_area_range />
            </ChartDisplay>
            <ChartDisplay name="general-area-area-stacked-basic" title="General Area Area Stacked Basic">
              <Charts.G2ChartComponent_general_area_area_stacked_basic />
            </ChartDisplay>
            <ChartDisplay name="general-area-area-with-negative" title="General Area Area With Negative">
              <Charts.G2ChartComponent_general_area_area_with_negative />
            </ChartDisplay>
            <ChartDisplay name="general-area-cascade-area" title="General Area Cascade Area">
              <Charts.G2ChartComponent_general_area_cascade_area />
            </ChartDisplay>
            <ChartDisplay name="general-area-label" title="General Area Label">
              <Charts.G2ChartComponent_general_area_label />
            </ChartDisplay>
            <ChartDisplay name="general-area-missing-data-area" title="General Area Missing Data Area">
              <Charts.G2ChartComponent_general_area_missing_data_area />
            </ChartDisplay>
            <ChartDisplay name="general-area-orderly-area" title="General Area Orderly Area">
              <Charts.G2ChartComponent_general_area_orderly_area />
            </ChartDisplay>
            <ChartDisplay name="general-area-percentage-area" title="General Area Percentage Area">
              <Charts.G2ChartComponent_general_area_percentage_area />
            </ChartDisplay>
            <ChartDisplay name="general-area-range-spline-area" title="General Area Range Spline Area">
              <Charts.G2ChartComponent_general_area_range_spline_area />
            </ChartDisplay>
            <ChartDisplay name="general-area-rank-trend-area" title="General Area Rank Trend Area">
              <Charts.G2ChartComponent_general_area_rank_trend_area />
            </ChartDisplay>
            <ChartDisplay name="general-area-stacked-area" title="General Area Stacked Area">
              <Charts.G2ChartComponent_general_area_stacked_area />
            </ChartDisplay>
            <ChartDisplay name="general-area-step-area" title="General Area Step Area">
              <Charts.G2ChartComponent_general_area_step_area />
            </ChartDisplay>
            <ChartDisplay name="general-area-streamgraph" title="General Area Streamgraph">
              <Charts.G2ChartComponent_general_area_streamgraph />
            </ChartDisplay>
            <ChartDisplay name="general-box-box" title="General Box Box">
              <Charts.G2ChartComponent_general_box_box />
            </ChartDisplay>
            <ChartDisplay name="general-box-boxplot" title="General Box Boxplot">
              <Charts.G2ChartComponent_general_box_boxplot />
            </ChartDisplay>
            <ChartDisplay name="general-box-boxplot-1d" title="General Box Boxplot 1d">
              <Charts.G2ChartComponent_general_box_boxplot_1d />
            </ChartDisplay>
            <ChartDisplay name="general-box-boxplot-outlier" title="General Box Boxplot Outlier">
              <Charts.G2ChartComponent_general_box_boxplot_outlier />
            </ChartDisplay>
            <ChartDisplay name="general-box-grouped-box" title="General Box Grouped Box">
              <Charts.G2ChartComponent_general_box_grouped_box />
            </ChartDisplay>
            <ChartDisplay name="general-box-grouped-boxplot-outlier" title="General Box Grouped Boxplot Outlier">
              <Charts.G2ChartComponent_general_box_grouped_boxplot_outlier />
            </ChartDisplay>
            <ChartDisplay name="general-box-polar-box" title="General Box Polar Box">
              <Charts.G2ChartComponent_general_box_polar_box />
            </ChartDisplay>
            <ChartDisplay name="general-bullet-bullet" title="General Bullet Bullet">
              <Charts.G2ChartComponent_general_bullet_bullet />
            </ChartDisplay>
            <ChartDisplay name="general-bullet-bullet-datas" title="General Bullet Bullet Datas">
              <Charts.G2ChartComponent_general_bullet_bullet_datas />
            </ChartDisplay>
            <ChartDisplay name="general-bullet-bullets" title="General Bullet Bullets">
              <Charts.G2ChartComponent_general_bullet_bullets />
            </ChartDisplay>
            <ChartDisplay name="general-candlestick-basis" title="General Candlestick Basis">
              <Charts.G2ChartComponent_general_candlestick_basis />
            </ChartDisplay>
            <ChartDisplay name="general-candlestick-k-and-area" title="General Candlestick K And Area">
              <Charts.G2ChartComponent_general_candlestick_k_and_area />
            </ChartDisplay>
            <ChartDisplay name="general-candlestick-k-and-column" title="General Candlestick K And Column">
              <Charts.G2ChartComponent_general_candlestick_k_and_column />
            </ChartDisplay>
            <ChartDisplay name="general-candlestick-line-candle-stick" title="General Candlestick Line Candle Stick">
              <Charts.G2ChartComponent_general_candlestick_line_candle_stick />
            </ChartDisplay>
            <ChartDisplay name="general-cell-cell-aggregated" title="General Cell Cell Aggregated">
              <Charts.G2ChartComponent_general_cell_cell_aggregated />
            </ChartDisplay>
            <ChartDisplay name="general-cell-cell-basic" title="General Cell Cell Basic">
              <Charts.G2ChartComponent_general_cell_cell_basic />
            </ChartDisplay>
            <ChartDisplay name="general-cell-cell-heatmap" title="General Cell Cell Heatmap">
              <Charts.G2ChartComponent_general_cell_cell_heatmap />
            </ChartDisplay>
            <ChartDisplay name="general-cell-cell-quantile" title="General Cell Cell Quantile">
              <Charts.G2ChartComponent_general_cell_cell_quantile />
            </ChartDisplay>
            <ChartDisplay name="general-cell-cell-quantize" title="General Cell Cell Quantize">
              <Charts.G2ChartComponent_general_cell_cell_quantize />
            </ChartDisplay>
            <ChartDisplay name="general-cell-cell-threshold" title="General Cell Cell Threshold">
              <Charts.G2ChartComponent_general_cell_cell_threshold />
            </ChartDisplay>
            <ChartDisplay name="general-dual-dual-aggregated-line-area" title="General Dual Dual Aggregated Line Area">
              <Charts.G2ChartComponent_general_dual_dual_aggregated_line_area />
            </ChartDisplay>
            <ChartDisplay name="general-dual-dual-axis-bar" title="General Dual Dual Axis Bar">
              <Charts.G2ChartComponent_general_dual_dual_axis_bar />
            </ChartDisplay>
            <ChartDisplay name="general-dual-dual-axis-line-bar" title="General Dual Dual Axis Line Bar">
              <Charts.G2ChartComponent_general_dual_dual_axis_line_bar />
            </ChartDisplay>
            <ChartDisplay name="general-dual-dual-axis-multi-line-bar" title="General Dual Dual Axis Multi Line Bar">
              <Charts.G2ChartComponent_general_dual_dual_axis_multi_line_bar />
            </ChartDisplay>
            <ChartDisplay name="general-dual-dual-axis-stacked-group-bar" title="General Dual Dual Axis Stacked Group Bar">
              <Charts.G2ChartComponent_general_dual_dual_axis_stacked_group_bar />
            </ChartDisplay>
            <ChartDisplay name="general-dual-line-bar" title="General Dual Line Bar">
              <Charts.G2ChartComponent_general_dual_line_bar />
            </ChartDisplay>
            <ChartDisplay name="general-dual-multi-line" title="General Dual Multi Line">
              <Charts.G2ChartComponent_general_dual_multi_line />
            </ChartDisplay>
            <ChartDisplay name="general-dual-multi-line-sync" title="General Dual Multi Line Sync">
              <Charts.G2ChartComponent_general_dual_multi_line_sync />
            </ChartDisplay>
            <ChartDisplay name="general-dual-pareto" title="General Dual Pareto">
              <Charts.G2ChartComponent_general_dual_pareto />
            </ChartDisplay>
            <ChartDisplay name="general-ema-ema-basic" title="General Ema Ema Basic">
              <Charts.G2ChartComponent_general_ema_ema_basic />
            </ChartDisplay>
            <ChartDisplay name="general-funnel-funnel" title="General Funnel Funnel">
              <Charts.G2ChartComponent_general_funnel_funnel />
            </ChartDisplay>
            <ChartDisplay name="general-funnel-funnel-annotation" title="General Funnel Funnel Annotation">
              <Charts.G2ChartComponent_general_funnel_funnel_annotation />
            </ChartDisplay>
            <ChartDisplay name="general-funnel-mirror-funnel" title="General Funnel Mirror Funnel">
              <Charts.G2ChartComponent_general_funnel_mirror_funnel />
            </ChartDisplay>
            <ChartDisplay name="general-funnel-pyramid" title="General Funnel Pyramid">
              <Charts.G2ChartComponent_general_funnel_pyramid />
            </ChartDisplay>
            <ChartDisplay name="general-gauge-gauge-custom-color" title="General Gauge Gauge Custom Color">
              <Charts.G2ChartComponent_general_gauge_gauge_custom_color />
            </ChartDisplay>
            <ChartDisplay name="general-gauge-gauge-custom-shape" title="General Gauge Gauge Custom Shape">
              <Charts.G2ChartComponent_general_gauge_gauge_custom_shape />
            </ChartDisplay>
            <ChartDisplay name="general-gauge-gauge-default" title="General Gauge Gauge Default">
              <Charts.G2ChartComponent_general_gauge_gauge_default />
            </ChartDisplay>
            <ChartDisplay name="general-gauge-gauge-round" title="General Gauge Gauge Round">
              <Charts.G2ChartComponent_general_gauge_gauge_round />
            </ChartDisplay>
            <ChartDisplay name="general-heatmap-heatmap" title="General Heatmap Heatmap">
              <Charts.G2ChartComponent_general_heatmap_heatmap />
            </ChartDisplay>
            <ChartDisplay name="general-heatmap-heatmap-density" title="General Heatmap Heatmap Density">
              <Charts.G2ChartComponent_general_heatmap_heatmap_density />
            </ChartDisplay>
            <ChartDisplay name="general-heatmap-mouse-heatmap" title="General Heatmap Mouse Heatmap">
              <Charts.G2ChartComponent_general_heatmap_mouse_heatmap />
            </ChartDisplay>
            <ChartDisplay name="general-helix-helix" title="General Helix Helix">
              <Charts.G2ChartComponent_general_helix_helix />
            </ChartDisplay>
            <ChartDisplay name="general-helix-helix-gene" title="General Helix Helix Gene">
              <Charts.G2ChartComponent_general_helix_helix_gene />
            </ChartDisplay>
            <ChartDisplay name="general-histogram-histogram" title="General Histogram Histogram">
              <Charts.G2ChartComponent_general_histogram_histogram />
            </ChartDisplay>
            <ChartDisplay name="general-histogram-histogram-binwidth" title="General Histogram Histogram Binwidth">
              <Charts.G2ChartComponent_general_histogram_histogram_binwidth />
            </ChartDisplay>
            <ChartDisplay name="general-histogram-histogram-stacked" title="General Histogram Histogram Stacked">
              <Charts.G2ChartComponent_general_histogram_histogram_stacked />
            </ChartDisplay>
            <ChartDisplay name="general-image-contributor" title="General Image Contributor">
              <Charts.G2ChartComponent_general_image_contributor />
            </ChartDisplay>
            <ChartDisplay name="general-image-icon" title="General Image Icon">
              <Charts.G2ChartComponent_general_image_icon />
            </ChartDisplay>
            <ChartDisplay name="general-image-logo" title="General Image Logo">
              <Charts.G2ChartComponent_general_image_logo />
            </ChartDisplay>
            <ChartDisplay name="general-interval-bar" title="General Interval Bar">
              <Charts.G2ChartComponent_general_interval_bar />
            </ChartDisplay>
            <ChartDisplay name="general-interval-bar-basic" title="General Interval Bar Basic">
              <Charts.G2ChartComponent_general_interval_bar_basic />
            </ChartDisplay>
            <ChartDisplay name="general-interval-bar-basic-grouped" title="General Interval Bar Basic Grouped">
              <Charts.G2ChartComponent_general_interval_bar_basic_grouped />
            </ChartDisplay>
            <ChartDisplay name="general-interval-bar-basic-stacked" title="General Interval Bar Basic Stacked">
              <Charts.G2ChartComponent_general_interval_bar_basic_stacked />
            </ChartDisplay>
            <ChartDisplay name="general-interval-bar-basic-transposed" title="General Interval Bar Basic Transposed">
              <Charts.G2ChartComponent_general_interval_bar_basic_transposed />
            </ChartDisplay>
            <ChartDisplay name="general-interval-bar-diverging" title="General Interval Bar Diverging">
              <Charts.G2ChartComponent_general_interval_bar_diverging />
            </ChartDisplay>
            <ChartDisplay name="general-interval-bar-dodged" title="General Interval Bar Dodged">
              <Charts.G2ChartComponent_general_interval_bar_dodged />
            </ChartDisplay>
            <ChartDisplay name="general-interval-bar-dual-axes" title="General Interval Bar Dual Axes">
              <Charts.G2ChartComponent_general_interval_bar_dual_axes />
            </ChartDisplay>
            <ChartDisplay name="general-interval-bar-fixed-cornered" title="General Interval Bar Fixed Cornered">
              <Charts.G2ChartComponent_general_interval_bar_fixed_cornered />
            </ChartDisplay>
            <ChartDisplay name="general-interval-bar-flex" title="General Interval Bar Flex">
              <Charts.G2ChartComponent_general_interval_bar_flex />
            </ChartDisplay>
            <ChartDisplay name="general-interval-bar-marimekko" title="General Interval Bar Marimekko">
              <Charts.G2ChartComponent_general_interval_bar_marimekko />
            </ChartDisplay>
            <ChartDisplay name="general-interval-bar-normalized-stacked" title="General Interval Bar Normalized Stacked">
              <Charts.G2ChartComponent_general_interval_bar_normalized_stacked />
            </ChartDisplay>
            <ChartDisplay name="general-interval-bar-range" title="General Interval Bar Range">
              <Charts.G2ChartComponent_general_interval_bar_range />
            </ChartDisplay>
            <ChartDisplay name="general-interval-bar-range-micro" title="General Interval Bar Range Micro">
              <Charts.G2ChartComponent_general_interval_bar_range_micro />
            </ChartDisplay>
            <ChartDisplay name="general-interval-bar-stacked" title="General Interval Bar Stacked">
              <Charts.G2ChartComponent_general_interval_bar_stacked />
            </ChartDisplay>
            <ChartDisplay name="general-interval-bar-stacked-diverging-rounded" title="General Interval Bar Stacked Diverging Rounded">
              <Charts.G2ChartComponent_general_interval_bar_stacked_diverging_rounded />
            </ChartDisplay>
            <ChartDisplay name="general-interval-bar-stacked-horizontal" title="General Interval Bar Stacked Horizontal">
              <Charts.G2ChartComponent_general_interval_bar_stacked_horizontal />
            </ChartDisplay>
            <ChartDisplay name="general-interval-bar-var-width" title="General Interval Bar Var Width">
              <Charts.G2ChartComponent_general_interval_bar_var_width />
            </ChartDisplay>
            <ChartDisplay name="general-interval-column-interactive" title="General Interval Column Interactive">
              <Charts.G2ChartComponent_general_interval_column_interactive />
            </ChartDisplay>
            <ChartDisplay name="general-interval-column-log" title="General Interval Column Log">
              <Charts.G2ChartComponent_general_interval_column_log />
            </ChartDisplay>
            <ChartDisplay name="general-interval-column-maxwidth" title="General Interval Column Maxwidth">
              <Charts.G2ChartComponent_general_interval_column_maxwidth />
            </ChartDisplay>
            <ChartDisplay name="general-interval-column-min-height" title="General Interval Column Min Height">
              <Charts.G2ChartComponent_general_interval_column_min_height />
            </ChartDisplay>
            <ChartDisplay name="general-interval-interval-style" title="General Interval Interval Style">
              <Charts.G2ChartComponent_general_interval_interval_style />
            </ChartDisplay>
            <ChartDisplay name="general-line-base" title="General Line Base">
              <Charts.G2ChartComponent_general_line_base />
            </ChartDisplay>
            <ChartDisplay name="general-line-curved" title="General Line Curved">
              <Charts.G2ChartComponent_general_line_curved />
            </ChartDisplay>
            <ChartDisplay name="general-line-line-aggregated-label" title="General Line Line Aggregated Label">
              <Charts.G2ChartComponent_general_line_line_aggregated_label />
            </ChartDisplay>
            <ChartDisplay name="general-line-line-area-clip-path" title="General Line Line Area Clip Path">
              <Charts.G2ChartComponent_general_line_line_area_clip_path />
            </ChartDisplay>
            <ChartDisplay name="general-line-line-basic" title="General Line Line Basic">
              <Charts.G2ChartComponent_general_line_line_basic />
            </ChartDisplay>
            <ChartDisplay name="general-line-line-connect-nulls" title="General Line Line Connect Nulls">
              <Charts.G2ChartComponent_general_line_line_connect_nulls />
            </ChartDisplay>
            <ChartDisplay name="general-line-line-gradient-encoding" title="General Line Line Gradient Encoding">
              <Charts.G2ChartComponent_general_line_line_gradient_encoding />
            </ChartDisplay>
            <ChartDisplay name="general-line-line-normalized" title="General Line Line Normalized">
              <Charts.G2ChartComponent_general_line_line_normalized />
            </ChartDisplay>
            <ChartDisplay name="general-line-line-sample" title="General Line Line Sample">
              <Charts.G2ChartComponent_general_line_line_sample />
            </ChartDisplay>
            <ChartDisplay name="general-line-line-series" title="General Line Line Series">
              <Charts.G2ChartComponent_general_line_line_series />
            </ChartDisplay>
            <ChartDisplay name="general-line-line-series-var-color" title="General Line Line Series Var Color">
              <Charts.G2ChartComponent_general_line_line_series_var_color />
            </ChartDisplay>
            <ChartDisplay name="general-line-line-slope" title="General Line Line Slope">
              <Charts.G2ChartComponent_general_line_line_slope />
            </ChartDisplay>
            <ChartDisplay name="general-line-line-style" title="General Line Line Style">
              <Charts.G2ChartComponent_general_line_line_style />
            </ChartDisplay>
            <ChartDisplay name="general-line-line-threshold" title="General Line Line Threshold">
              <Charts.G2ChartComponent_general_line_line_threshold />
            </ChartDisplay>
            <ChartDisplay name="general-line-line-var-size" title="General Line Line Var Size">
              <Charts.G2ChartComponent_general_line_line_var_size />
            </ChartDisplay>
            <ChartDisplay name="general-line-line-var-size-facet" title="General Line Line Var Size Facet">
              <Charts.G2ChartComponent_general_line_line_var_size_facet />
            </ChartDisplay>
            <ChartDisplay name="general-line-line-var-size-missing" title="General Line Line Var Size Missing">
              <Charts.G2ChartComponent_general_line_line_var_size_missing />
            </ChartDisplay>
            <ChartDisplay name="general-line-line-variable-color" title="General Line Line Variable Color">
              <Charts.G2ChartComponent_general_line_line_variable_color />
            </ChartDisplay>
            <ChartDisplay name="general-line-line-zero-values" title="General Line Line Zero Values">
              <Charts.G2ChartComponent_general_line_line_zero_values />
            </ChartDisplay>
            <ChartDisplay name="general-line-step" title="General Line Step">
              <Charts.G2ChartComponent_general_line_step />
            </ChartDisplay>
            <ChartDisplay name="general-link-link" title="General Link Link">
              <Charts.G2ChartComponent_general_link_link />
            </ChartDisplay>
            <ChartDisplay name="general-link-link-annotation" title="General Link Link Annotation">
              <Charts.G2ChartComponent_general_link_link_annotation />
            </ChartDisplay>
            <ChartDisplay name="general-link-link-shape" title="General Link Link Shape">
              <Charts.G2ChartComponent_general_link_link_shape />
            </ChartDisplay>
            <ChartDisplay name="general-liquid-liquid-background" title="General Liquid Liquid Background">
              <Charts.G2ChartComponent_general_liquid_liquid_background />
            </ChartDisplay>
            <ChartDisplay name="general-liquid-liquid-content" title="General Liquid Liquid Content">
              <Charts.G2ChartComponent_general_liquid_liquid_content />
            </ChartDisplay>
            <ChartDisplay name="general-liquid-liquid-custom-shape" title="General Liquid Liquid Custom Shape">
              <Charts.G2ChartComponent_general_liquid_liquid_custom_shape />
            </ChartDisplay>
            <ChartDisplay name="general-liquid-liquid-default" title="General Liquid Liquid Default">
              <Charts.G2ChartComponent_general_liquid_liquid_default />
            </ChartDisplay>
            <ChartDisplay name="general-liquid-liquid-pin" title="General Liquid Liquid Pin">
              <Charts.G2ChartComponent_general_liquid_liquid_pin />
            </ChartDisplay>
            <ChartDisplay name="general-mini-area" title="General Mini Area">
              <Charts.G2ChartComponent_general_mini_area />
            </ChartDisplay>
            <ChartDisplay name="general-mini-column" title="General Mini Column">
              <Charts.G2ChartComponent_general_mini_column />
            </ChartDisplay>
            <ChartDisplay name="general-mini-line" title="General Mini Line">
              <Charts.G2ChartComponent_general_mini_line />
            </ChartDisplay>
            <ChartDisplay name="general-mini-pie" title="General Mini Pie">
              <Charts.G2ChartComponent_general_mini_pie />
            </ChartDisplay>
            <ChartDisplay name="general-mini-progress" title="General Mini Progress">
              <Charts.G2ChartComponent_general_mini_progress />
            </ChartDisplay>
            <ChartDisplay name="general-mini-ring" title="General Mini Ring">
              <Charts.G2ChartComponent_general_mini_ring />
            </ChartDisplay>
            <ChartDisplay name="general-parallel-line-parallel-horizontal" title="General Parallel Line Parallel Horizontal">
              <Charts.G2ChartComponent_general_parallel_line_parallel_horizontal />
            </ChartDisplay>
            <ChartDisplay name="general-parallel-line-parallel-vertical" title="General Parallel Line Parallel Vertical">
              <Charts.G2ChartComponent_general_parallel_line_parallel_vertical />
            </ChartDisplay>
            <ChartDisplay name="general-pie-donut" title="General Pie Donut">
              <Charts.G2ChartComponent_general_pie_donut />
            </ChartDisplay>
            <ChartDisplay name="general-pie-donut-base" title="General Pie Donut Base">
              <Charts.G2ChartComponent_general_pie_donut_base />
            </ChartDisplay>
            <ChartDisplay name="general-pie-pie" title="General Pie Pie">
              <Charts.G2ChartComponent_general_pie_pie />
            </ChartDisplay>
            <ChartDisplay name="general-pie-pie-base" title="General Pie Pie Base">
              <Charts.G2ChartComponent_general_pie_pie_base />
            </ChartDisplay>
            <ChartDisplay name="general-pie-pie-base-facet" title="General Pie Pie Base Facet">
              <Charts.G2ChartComponent_general_pie_pie_base_facet />
            </ChartDisplay>
            <ChartDisplay name="general-pie-pie-donut-text" title="General Pie Pie Donut Text">
              <Charts.G2ChartComponent_general_pie_pie_donut_text />
            </ChartDisplay>
            <ChartDisplay name="general-pie-point-jitter-radial" title="General Pie Point Jitter Radial">
              <Charts.G2ChartComponent_general_pie_point_jitter_radial />
            </ChartDisplay>
            <ChartDisplay name="general-pie-spider-label" title="General Pie Spider Label">
              <Charts.G2ChartComponent_general_pie_spider_label />
            </ChartDisplay>
            <ChartDisplay name="general-pie-spider-label-overlap" title="General Pie Spider Label Overlap">
              <Charts.G2ChartComponent_general_pie_spider_label_overlap />
            </ChartDisplay>
            <ChartDisplay name="general-point-point-aggregated" title="General Point Point Aggregated">
              <Charts.G2ChartComponent_general_point_point_aggregated />
            </ChartDisplay>
            <ChartDisplay name="general-point-point-basic" title="General Point Point Basic">
              <Charts.G2ChartComponent_general_point_point_basic />
            </ChartDisplay>
            <ChartDisplay name="general-point-point-bubble" title="General Point Point Bubble">
              <Charts.G2ChartComponent_general_point_point_bubble />
            </ChartDisplay>
            <ChartDisplay name="general-point-point-dot" title="General Point Point Dot">
              <Charts.G2ChartComponent_general_point_point_dot />
            </ChartDisplay>
            <ChartDisplay name="general-point-point-jitter" title="General Point Point Jitter">
              <Charts.G2ChartComponent_general_point_point_jitter />
            </ChartDisplay>
            <ChartDisplay name="general-point-point-label" title="General Point Point Label">
              <Charts.G2ChartComponent_general_point_point_label />
            </ChartDisplay>
            <ChartDisplay name="general-point-point-log" title="General Point Point Log">
              <Charts.G2ChartComponent_general_point_point_log />
            </ChartDisplay>
            <ChartDisplay name="general-point-point-one-dimension" title="General Point Point One Dimension">
              <Charts.G2ChartComponent_general_point_point_one_dimension />
            </ChartDisplay>
            <ChartDisplay name="general-point-point-sequential" title="General Point Point Sequential">
              <Charts.G2ChartComponent_general_point_point_sequential />
            </ChartDisplay>
            <ChartDisplay name="general-point-point-shape" title="General Point Point Shape">
              <Charts.G2ChartComponent_general_point_point_shape />
            </ChartDisplay>
            <ChartDisplay name="general-point-point-stacked" title="General Point Point Stacked">
              <Charts.G2ChartComponent_general_point_point_stacked />
            </ChartDisplay>
            <ChartDisplay name="general-point-point-strip" title="General Point Point Strip">
              <Charts.G2ChartComponent_general_point_point_strip />
            </ChartDisplay>
            <ChartDisplay name="general-point-point-style" title="General Point Point Style">
              <Charts.G2ChartComponent_general_point_point_style />
            </ChartDisplay>
            <ChartDisplay name="general-polygon-treemap" title="General Polygon Treemap">
              <Charts.G2ChartComponent_general_polygon_treemap />
            </ChartDisplay>
            <ChartDisplay name="general-polygon-voronoi" title="General Polygon Voronoi">
              <Charts.G2ChartComponent_general_polygon_voronoi />
            </ChartDisplay>
            <ChartDisplay name="general-radar-area-radial" title="General Radar Area Radial">
              <Charts.G2ChartComponent_general_radar_area_radial />
            </ChartDisplay>
            <ChartDisplay name="general-radar-complex-radial" title="General Radar Complex Radial">
              <Charts.G2ChartComponent_general_radar_complex_radial />
            </ChartDisplay>
            <ChartDisplay name="general-radar-grid-radial" title="General Radar Grid Radial">
              <Charts.G2ChartComponent_general_radar_grid_radial />
            </ChartDisplay>
            <ChartDisplay name="general-radar-parallel-radar" title="General Radar Parallel Radar">
              <Charts.G2ChartComponent_general_radar_parallel_radar />
            </ChartDisplay>
            <ChartDisplay name="general-radar-radar" title="General Radar Radar">
              <Charts.G2ChartComponent_general_radar_radar />
            </ChartDisplay>
            <ChartDisplay name="general-radar-radial-with-background-color" title="General Radar Radial With Background Color">
              <Charts.G2ChartComponent_general_radar_radial_with_background_color />
            </ChartDisplay>
            <ChartDisplay name="general-radar-square-radar" title="General Radar Square Radar">
              <Charts.G2ChartComponent_general_radar_square_radar />
            </ChartDisplay>
            <ChartDisplay name="general-radial-apple-activity" title="General Radial Apple Activity">
              <Charts.G2ChartComponent_general_radial_apple_activity />
            </ChartDisplay>
            <ChartDisplay name="general-radial-bar-cornered-radial" title="General Radial Bar Cornered Radial">
              <Charts.G2ChartComponent_general_radial_bar_cornered_radial />
            </ChartDisplay>
            <ChartDisplay name="general-radial-bar-radial" title="General Radial Bar Radial">
              <Charts.G2ChartComponent_general_radial_bar_radial />
            </ChartDisplay>
            <ChartDisplay name="general-radial-radial-bar-with-background" title="General Radial Radial Bar With Background">
              <Charts.G2ChartComponent_general_radial_radial_bar_with_background />
            </ChartDisplay>
            <ChartDisplay name="general-radial-radial-line" title="General Radial Radial Line">
              <Charts.G2ChartComponent_general_radial_radial_line />
            </ChartDisplay>
            <ChartDisplay name="general-radial-radial-stacked" title="General Radial Radial Stacked">
              <Charts.G2ChartComponent_general_radial_radial_stacked />
            </ChartDisplay>
            <ChartDisplay name="general-rose-donut-rose" title="General Rose Donut Rose">
              <Charts.G2ChartComponent_general_rose_donut_rose />
            </ChartDisplay>
            <ChartDisplay name="general-rose-nightingale-rose" title="General Rose Nightingale Rose">
              <Charts.G2ChartComponent_general_rose_nightingale_rose />
            </ChartDisplay>
            <ChartDisplay name="general-rose-polar-stack" title="General Rose Polar Stack">
              <Charts.G2ChartComponent_general_rose_polar_stack />
            </ChartDisplay>
            <ChartDisplay name="general-rose-rose" title="General Rose Rose">
              <Charts.G2ChartComponent_general_rose_rose />
            </ChartDisplay>
            <ChartDisplay name="general-rose-rose-label" title="General Rose Rose Label">
              <Charts.G2ChartComponent_general_rose_rose_label />
            </ChartDisplay>
            <ChartDisplay name="general-rose-stacked-rose" title="General Rose Stacked Rose">
              <Charts.G2ChartComponent_general_rose_stacked_rose />
            </ChartDisplay>
            <ChartDisplay name="general-rose-wind-rose" title="General Rose Wind Rose">
              <Charts.G2ChartComponent_general_rose_wind_rose />
            </ChartDisplay>
            <ChartDisplay name="general-sunburst-sunburst-color" title="General Sunburst Sunburst Color">
              <Charts.G2ChartComponent_general_sunburst_sunburst_color />
            </ChartDisplay>
            <ChartDisplay name="general-sunburst-sunburst-default" title="General Sunburst Sunburst Default">
              <Charts.G2ChartComponent_general_sunburst_sunburst_default />
            </ChartDisplay>
            <ChartDisplay name="general-sunburst-sunburst-interaction" title="General Sunburst Sunburst Interaction">
              <Charts.G2ChartComponent_general_sunburst_sunburst_interaction />
            </ChartDisplay>
            <ChartDisplay name="general-sunburst-sunburst-label" title="General Sunburst Sunburst Label">
              <Charts.G2ChartComponent_general_sunburst_sunburst_label />
            </ChartDisplay>
            <ChartDisplay name="general-sunburst-sunburst-pattern" title="General Sunburst Sunburst Pattern">
              <Charts.G2ChartComponent_general_sunburst_sunburst_pattern />
            </ChartDisplay>
            <ChartDisplay name="general-sunburst-sunburst-style" title="General Sunburst Sunburst Style">
              <Charts.G2ChartComponent_general_sunburst_sunburst_style />
            </ChartDisplay>
            <ChartDisplay name="general-text-paragraph" title="General Text Paragraph">
              <Charts.G2ChartComponent_general_text_paragraph />
            </ChartDisplay>
            <ChartDisplay name="general-text-poetry" title="General Text Poetry">
              <Charts.G2ChartComponent_general_text_poetry />
            </ChartDisplay>
            <ChartDisplay name="general-text-train" title="General Text Train">
              <Charts.G2ChartComponent_general_text_train />
            </ChartDisplay>
            <ChartDisplay name="general-text-wordcloud" title="General Text Wordcloud">
              <Charts.G2ChartComponent_general_text_wordcloud />
            </ChartDisplay>
            <ChartDisplay name="general-text-wordcloud-english" title="General Text Wordcloud English">
              <Charts.G2ChartComponent_general_text_wordcloud_english />
            </ChartDisplay>
            <ChartDisplay name="general-text-wordcloud-mask" title="General Text Wordcloud Mask">
              <Charts.G2ChartComponent_general_text_wordcloud_mask />
            </ChartDisplay>
            <ChartDisplay name="general-vector-poisson" title="General Vector Poisson">
              <Charts.G2ChartComponent_general_vector_poisson />
            </ChartDisplay>
            <ChartDisplay name="general-vector-wind" title="General Vector Wind">
              <Charts.G2ChartComponent_general_vector_wind />
            </ChartDisplay>
            <ChartDisplay name="general-venn-venn" title="General Venn Venn">
              <Charts.G2ChartComponent_general_venn_venn />
            </ChartDisplay>
            <ChartDisplay name="general-venn-venn-hollow" title="General Venn Venn Hollow">
              <Charts.G2ChartComponent_general_venn_venn_hollow />
            </ChartDisplay>
            <ChartDisplay name="general-violin-density" title="General Violin Density">
              <Charts.G2ChartComponent_general_violin_density />
            </ChartDisplay>
            <ChartDisplay name="general-violin-violin" title="General Violin Violin">
              <Charts.G2ChartComponent_general_violin_violin />
            </ChartDisplay>
            <ChartDisplay name="general-violin-violin-polar" title="General Violin Violin Polar">
              <Charts.G2ChartComponent_general_violin_violin_polar />
            </ChartDisplay>
            <ChartDisplay name="geo-geo-choropleth-usa" title="Geo Geo Choropleth Usa">
              <Charts.G2ChartComponent_geo_geo_choropleth_usa />
            </ChartDisplay>
            <ChartDisplay name="geo-geo-flights-airports" title="Geo Geo Flights Airports">
              <Charts.G2ChartComponent_geo_geo_flights_airports />
            </ChartDisplay>
            <ChartDisplay name="geo-geo-hexbin-china" title="Geo Geo Hexbin China">
              <Charts.G2ChartComponent_geo_geo_hexbin_china />
            </ChartDisplay>
            <ChartDisplay name="geo-geo-hexjson-usa" title="Geo Geo Hexjson Usa">
              <Charts.G2ChartComponent_geo_geo_hexjson_usa />
            </ChartDisplay>
            <ChartDisplay name="geo-geo-london-tube-lines" title="Geo Geo London Tube Lines">
              <Charts.G2ChartComponent_geo_geo_london_tube_lines />
            </ChartDisplay>
            <ChartDisplay name="geo-geo-projection-comparison" title="Geo Geo Projection Comparison">
              <Charts.G2ChartComponent_geo_geo_projection_comparison />
            </ChartDisplay>
            <ChartDisplay name="geo-geo-world-map" title="Geo Geo World Map">
              <Charts.G2ChartComponent_geo_geo_world_map />
            </ChartDisplay>
            <ChartDisplay name="graph-hierarchy-circle-packing" title="Graph Hierarchy Circle Packing">
              <Charts.G2ChartComponent_graph_hierarchy_circle_packing />
            </ChartDisplay>
            <ChartDisplay name="graph-hierarchy-tree" title="Graph Hierarchy Tree">
              <Charts.G2ChartComponent_graph_hierarchy_tree />
            </ChartDisplay>
            <ChartDisplay name="graph-hierarchy-treemap" title="Graph Hierarchy Treemap">
              <Charts.G2ChartComponent_graph_hierarchy_treemap />
            </ChartDisplay>
            <ChartDisplay name="graph-hierarchy-treemap-drill-down" title="Graph Hierarchy Treemap Drill Down">
              <Charts.G2ChartComponent_graph_hierarchy_treemap_drill_down />
            </ChartDisplay>
            <ChartDisplay name="graph-network-chord" title="Graph Network Chord">
              <Charts.G2ChartComponent_graph_network_chord />
            </ChartDisplay>
            <ChartDisplay name="graph-network-forcegraph" title="Graph Network Forcegraph">
              <Charts.G2ChartComponent_graph_network_forcegraph />
            </ChartDisplay>
            <ChartDisplay name="graph-network-forcegraph-disjoint" title="Graph Network Forcegraph Disjoint">
              <Charts.G2ChartComponent_graph_network_forcegraph_disjoint />
            </ChartDisplay>
            <ChartDisplay name="graph-network-sankey" title="Graph Network Sankey">
              <Charts.G2ChartComponent_graph_network_sankey />
            </ChartDisplay>
            <ChartDisplay name="intelligent-auto-auto-interval" title="Intelligent Auto Auto Interval">
              <Charts.G2ChartComponent_intelligent_auto_auto_interval />
            </ChartDisplay>
            <ChartDisplay name="intelligent-auto-auto-line" title="Intelligent Auto Auto Line">
              <Charts.G2ChartComponent_intelligent_auto_auto_line />
            </ChartDisplay>
            <ChartDisplay name="intelligent-auto-auto-pie" title="Intelligent Auto Auto Pie">
              <Charts.G2ChartComponent_intelligent_auto_auto_pie />
            </ChartDisplay>
            <ChartDisplay name="intelligent-auto-auto-scatter" title="Intelligent Auto Auto Scatter">
              <Charts.G2ChartComponent_intelligent_auto_auto_scatter />
            </ChartDisplay>
            <ChartDisplay name="intelligent-insight-category-outlier" title="Intelligent Insight Category Outlier">
              <Charts.G2ChartComponent_intelligent_insight_category_outlier />
            </ChartDisplay>
            <ChartDisplay name="intelligent-insight-change-point" title="Intelligent Insight Change Point">
              <Charts.G2ChartComponent_intelligent_insight_change_point />
            </ChartDisplay>
            <ChartDisplay name="intelligent-insight-insight" title="Intelligent Insight Insight">
              <Charts.G2ChartComponent_intelligent_insight_insight />
            </ChartDisplay>
            <ChartDisplay name="intelligent-insight-low-variance" title="Intelligent Insight Low Variance">
              <Charts.G2ChartComponent_intelligent_insight_low_variance />
            </ChartDisplay>
            <ChartDisplay name="intelligent-insight-time-series-outlier" title="Intelligent Insight Time Series Outlier">
              <Charts.G2ChartComponent_intelligent_insight_time_series_outlier />
            </ChartDisplay>
            <ChartDisplay name="intelligent-insight-trend" title="Intelligent Insight Trend">
              <Charts.G2ChartComponent_intelligent_insight_trend />
            </ChartDisplay>
            <ChartDisplay name="interaction-brush-brush" title="Interaction Brush Brush">
              <Charts.G2ChartComponent_interaction_brush_brush />
            </ChartDisplay>
            <ChartDisplay name="interaction-brush-brush-emit" title="Interaction Brush Brush Emit">
              <Charts.G2ChartComponent_interaction_brush_brush_emit />
            </ChartDisplay>
            <ChartDisplay name="interaction-component-legend" title="Interaction Component Legend">
              <Charts.G2ChartComponent_interaction_component_legend />
            </ChartDisplay>
            <ChartDisplay name="interaction-data-area-element-point-move" title="Interaction Data Area Element Point Move">
              <Charts.G2ChartComponent_interaction_data_area_element_point_move />
            </ChartDisplay>
            <ChartDisplay name="interaction-data-area-normalizey-element-point-move" title="Interaction Data Area Normalizey Element Point Move">
              <Charts.G2ChartComponent_interaction_data_area_normalizey_element_point_move />
            </ChartDisplay>
            <ChartDisplay name="interaction-data-bar-element-point-move" title="Interaction Data Bar Element Point Move">
              <Charts.G2ChartComponent_interaction_data_bar_element_point_move />
            </ChartDisplay>
            <ChartDisplay name="interaction-data-bar-normalizey-element-point-move" title="Interaction Data Bar Normalizey Element Point Move">
              <Charts.G2ChartComponent_interaction_data_bar_normalizey_element_point_move />
            </ChartDisplay>
            <ChartDisplay name="interaction-data-column-element-point-move" title="Interaction Data Column Element Point Move">
              <Charts.G2ChartComponent_interaction_data_column_element_point_move />
            </ChartDisplay>
            <ChartDisplay name="interaction-data-column-normalizey-element-point-move" title="Interaction Data Column Normalizey Element Point Move">
              <Charts.G2ChartComponent_interaction_data_column_normalizey_element_point_move />
            </ChartDisplay>
            <ChartDisplay name="interaction-data-line-element-point-move" title="Interaction Data Line Element Point Move">
              <Charts.G2ChartComponent_interaction_data_line_element_point_move />
            </ChartDisplay>
            <ChartDisplay name="interaction-data-line-element-point-move-polar" title="Interaction Data Line Element Point Move Polar">
              <Charts.G2ChartComponent_interaction_data_line_element_point_move_polar />
            </ChartDisplay>
            <ChartDisplay name="interaction-data-pie-element-point-move" title="Interaction Data Pie Element Point Move">
              <Charts.G2ChartComponent_interaction_data_pie_element_point_move />
            </ChartDisplay>
            <ChartDisplay name="interaction-element-highlight" title="Interaction Element Highlight">
              <Charts.G2ChartComponent_interaction_element_highlight />
            </ChartDisplay>
            <ChartDisplay name="interaction-element-select" title="Interaction Element Select">
              <Charts.G2ChartComponent_interaction_element_select />
            </ChartDisplay>
            <ChartDisplay name="interaction-element-slider" title="Interaction Element Slider">
              <Charts.G2ChartComponent_interaction_element_slider />
            </ChartDisplay>
            <ChartDisplay name="interaction-multi-view-focus-context" title="Interaction Multi View Focus Context">
              <Charts.G2ChartComponent_interaction_multi_view_focus_context />
            </ChartDisplay>
            <ChartDisplay name="interaction-other-chart-index" title="Interaction Other Chart Index">
              <Charts.G2ChartComponent_interaction_other_chart_index />
            </ChartDisplay>
            <ChartDisplay name="interaction-other-fisheye" title="Interaction Other Fisheye">
              <Charts.G2ChartComponent_interaction_other_fisheye />
            </ChartDisplay>
            <ChartDisplay name="interesting-interesting-25d-column" title="Interesting Interesting 25d Column">
              <Charts.G2ChartComponent_interesting_interesting_25d_column />
            </ChartDisplay>
            <ChartDisplay name="interesting-interesting-messi" title="Interesting Interesting Messi">
              <Charts.G2ChartComponent_interesting_interesting_messi />
            </ChartDisplay>
            <ChartDisplay name="interesting-interesting-national" title="Interesting Interesting National">
              <Charts.G2ChartComponent_interesting_interesting_national />
            </ChartDisplay>
            <ChartDisplay name="interesting-interesting-petal" title="Interesting Interesting Petal">
              <Charts.G2ChartComponent_interesting_interesting_petal />
            </ChartDisplay>
            <ChartDisplay name="interesting-interesting-timeline" title="Interesting Interesting Timeline">
              <Charts.G2ChartComponent_interesting_interesting_timeline />
            </ChartDisplay>
            <ChartDisplay name="layout-layout-chart-layout" title="Layout Layout Chart Layout">
              <Charts.G2ChartComponent_layout_layout_chart_layout />
            </ChartDisplay>
            <ChartDisplay name="layout-style-chart-view-style" title="Layout Style Chart View Style">
              <Charts.G2ChartComponent_layout_style_chart_view_style />
            </ChartDisplay>
            <ChartDisplay name="renderer-renderer-canvas" title="Renderer Renderer Canvas">
              <Charts.G2ChartComponent_renderer_renderer_canvas />
            </ChartDisplay>
            <ChartDisplay name="renderer-renderer-svg" title="Renderer Renderer Svg">
              <Charts.G2ChartComponent_renderer_renderer_svg />
            </ChartDisplay>
            <ChartDisplay name="renderer-renderer-webgl" title="Renderer Renderer Webgl">
              <Charts.G2ChartComponent_renderer_renderer_webgl />
            </ChartDisplay>
            <ChartDisplay name="storytelling-storytelling-facet-keyframe" title="Storytelling Storytelling Facet Keyframe">
              <Charts.G2ChartComponent_storytelling_storytelling_facet_keyframe />
            </ChartDisplay>
            <ChartDisplay name="storytelling-storytelling-gantt" title="Storytelling Storytelling Gantt">
              <Charts.G2ChartComponent_storytelling_storytelling_gantt />
            </ChartDisplay>
            <ChartDisplay name="storytelling-storytelling-interval-keyframe" title="Storytelling Storytelling Interval Keyframe">
              <Charts.G2ChartComponent_storytelling_storytelling_interval_keyframe />
            </ChartDisplay>
            <ChartDisplay name="storytelling-storytelling-point-keyframe" title="Storytelling Storytelling Point Keyframe">
              <Charts.G2ChartComponent_storytelling_storytelling_point_keyframe />
            </ChartDisplay>
            <ChartDisplay name="storytelling-storytelling-stocks-keyframe" title="Storytelling Storytelling Stocks Keyframe">
              <Charts.G2ChartComponent_storytelling_storytelling_stocks_keyframe />
            </ChartDisplay>
            <ChartDisplay name="style-graphic-area" title="Style Graphic Area">
              <Charts.G2ChartComponent_style_graphic_area />
            </ChartDisplay>
            <ChartDisplay name="style-graphic-gauge" title="Style Graphic Gauge">
              <Charts.G2ChartComponent_style_graphic_gauge />
            </ChartDisplay>
            <ChartDisplay name="style-graphic-line" title="Style Graphic Line">
              <Charts.G2ChartComponent_style_graphic_line />
            </ChartDisplay>
            <ChartDisplay name="style-graphic-mark" title="Style Graphic Mark">
              <Charts.G2ChartComponent_style_graphic_mark />
            </ChartDisplay>
            <ChartDisplay name="style-graphic-pattern" title="Style Graphic Pattern">
              <Charts.G2ChartComponent_style_graphic_pattern />
            </ChartDisplay>
            <ChartDisplay name="style-graphic-radial-gradient" title="Style Graphic Radial Gradient">
              <Charts.G2ChartComponent_style_graphic_radial_gradient />
            </ChartDisplay>
            <ChartDisplay name="style-graphic-text" title="Style Graphic Text">
              <Charts.G2ChartComponent_style_graphic_text />
            </ChartDisplay>
            <ChartDisplay name="style-pattern-custom-pattern-with-canvas" title="Style Pattern Custom Pattern With Canvas">
              <Charts.G2ChartComponent_style_pattern_custom_pattern_with_canvas />
            </ChartDisplay>
            <ChartDisplay name="style-pattern-custom-pattern-with-g-api" title="Style Pattern Custom Pattern With G Api">
              <Charts.G2ChartComponent_style_pattern_custom_pattern_with_g_api />
            </ChartDisplay>
            <ChartDisplay name="style-pattern-dots-pattern" title="Style Pattern Dots Pattern">
              <Charts.G2ChartComponent_style_pattern_dots_pattern />
            </ChartDisplay>
            <ChartDisplay name="style-pattern-lines-pattern" title="Style Pattern Lines Pattern">
              <Charts.G2ChartComponent_style_pattern_lines_pattern />
            </ChartDisplay>
            <ChartDisplay name="style-pattern-squares-pattern" title="Style Pattern Squares Pattern">
              <Charts.G2ChartComponent_style_pattern_squares_pattern />
            </ChartDisplay>
            <ChartDisplay name="style-rough-interval" title="Style Rough Interval">
              <Charts.G2ChartComponent_style_rough_interval />
            </ChartDisplay>
            <ChartDisplay name="style-rough-line" title="Style Rough Line">
              <Charts.G2ChartComponent_style_rough_line />
            </ChartDisplay>
            <ChartDisplay name="style-rough-point" title="Style Rough Point">
              <Charts.G2ChartComponent_style_rough_point />
            </ChartDisplay>
            <ChartDisplay name="style-rough-radial" title="Style Rough Radial">
              <Charts.G2ChartComponent_style_rough_radial />
            </ChartDisplay>
            <ChartDisplay name="style-theme-academy" title="Style Theme Academy">
              <Charts.G2ChartComponent_style_theme_academy />
            </ChartDisplay>
            <ChartDisplay name="style-theme-dark" title="Style Theme Dark">
              <Charts.G2ChartComponent_style_theme_dark />
            </ChartDisplay>
            <ChartDisplay name="style-theme-layout-area" title="Style Theme Layout Area">
              <Charts.G2ChartComponent_style_theme_layout_area />
            </ChartDisplay>
            <ChartDisplay name="threed-bar-cone" title="Threed Bar Cone">
              <Charts.G2ChartComponent_threed_bar_cone />
            </ChartDisplay>
            <ChartDisplay name="threed-bar-cube" title="Threed Bar Cube">
              <Charts.G2ChartComponent_threed_bar_cube />
            </ChartDisplay>
            <ChartDisplay name="threed-bar-cylinder" title="Threed Bar Cylinder">
              <Charts.G2ChartComponent_threed_bar_cylinder />
            </ChartDisplay>
            <ChartDisplay name="threed-line-polyline" title="Threed Line Polyline">
              <Charts.G2ChartComponent_threed_line_polyline />
            </ChartDisplay>
            <ChartDisplay name="threed-line-spiral" title="Threed Line Spiral">
              <Charts.G2ChartComponent_threed_line_spiral />
            </ChartDisplay>
            <ChartDisplay name="threed-scatter-camera-animation" title="Threed Scatter Camera Animation">
              <Charts.G2ChartComponent_threed_scatter_camera_animation />
            </ChartDisplay>
            <ChartDisplay name="threed-scatter-circle-shape" title="Threed Scatter Circle Shape">
              <Charts.G2ChartComponent_threed_scatter_circle_shape />
            </ChartDisplay>
            <ChartDisplay name="threed-scatter-custom-legend" title="Threed Scatter Custom Legend">
              <Charts.G2ChartComponent_threed_scatter_custom_legend />
            </ChartDisplay>
            <ChartDisplay name="threed-scatter-orthographic-projection" title="Threed Scatter Orthographic Projection">
              <Charts.G2ChartComponent_threed_scatter_orthographic_projection />
            </ChartDisplay>
            <ChartDisplay name="threed-scatter-perspective-projection" title="Threed Scatter Perspective Projection">
              <Charts.G2ChartComponent_threed_scatter_perspective_projection />
            </ChartDisplay>
            <ChartDisplay name="threed-scatter-sphere-shape" title="Threed Scatter Sphere Shape">
              <Charts.G2ChartComponent_threed_scatter_sphere_shape />
            </ChartDisplay>
            <ChartDisplay name="threed-scatter-square-shape" title="Threed Scatter Square Shape">
              <Charts.G2ChartComponent_threed_scatter_square_shape />
            </ChartDisplay>
            <ChartDisplay name="threed-scatter-triangle-shape" title="Threed Scatter Triangle Shape">
              <Charts.G2ChartComponent_threed_scatter_triangle_shape />
            </ChartDisplay>
            <ChartDisplay name="threed-surface-dirichlet" title="Threed Surface Dirichlet">
              <Charts.G2ChartComponent_threed_surface_dirichlet />
            </ChartDisplay>
            <ChartDisplay name="threed-surface-trigonometric" title="Threed Surface Trigonometric">
              <Charts.G2ChartComponent_threed_surface_trigonometric />
            </ChartDisplay>
            <ChartDisplay name="unit-unit-2d" title="Unit Unit 2d">
              <Charts.G2ChartComponent_unit_unit_2d />
            </ChartDisplay>
            <ChartDisplay name="unit-unit-basic" title="Unit Unit Basic">
              <Charts.G2ChartComponent_unit_unit_basic />
            </ChartDisplay>
            <ChartDisplay name="unit-unit-nested" title="Unit Unit Nested">
              <Charts.G2ChartComponent_unit_unit_nested />
            </ChartDisplay>
            <ChartDisplay name="unit-unit-share-data" title="Unit Unit Share Data">
              <Charts.G2ChartComponent_unit_unit_share_data />
            </ChartDisplay>
            <ChartDisplay name="unit-unit-share-size" title="Unit Unit Share Size">
              <Charts.G2ChartComponent_unit_unit_share_size />
            </ChartDisplay>

          </div>
        </div>
      </div>
    </div>
  )
}
