var dataNodes = [];
var nodeEdges = [];
		
for(stage in stages){
	for (elm in stages[stage]){
		var data = {
			id : stage+"."+elm,
			text: stages[stage][elm].text
		};
		
	if (stages[stage][elm].changeStat){
		var statChoices = {};
		data['changeStat'] = stages[stage][elm].changeStat;
	}

	if (stages[stage][elm].options){
		var optionChoices = {};
		for (option in stages[stage][elm].options){
			optionChoices[option] = {
				text: stages[stage][elm].options[option].text,
				next: stages[stage][elm].options[option].next
			};

			nodeEdges.push(
				{ data: { source: stage+"."+elm, target: stages[stage][elm].options[option].next } }
			);
		}
		data['options'] = optionChoices;
	}
				
	if(stages[stage][elm].jump){
		data['jump'] = stages[stage][elm].jump;

		nodeEdges.push(
			{ data: { source: stage+"."+elm, target: stages[stage][elm].jump } }
		);
	}

	dataNodes.push({data});
	}
};

$(function(){
	var cy = window.cy = cytoscape({
		container: document.getElementById('cy'),
		boxSelectionEnabled: false,
		autounselectify: true,
		layout: {
			name: 'dagre'
		},
		style: [
			{
			selector: 'node',
			style: {
				'content': 'data(id)',
				'text-opacity': 0.5,
				'text-valign': 'center',
				'text-halign': 'right',
				'background-color': '#11479e'
				}
			},
			{
			selector: 'edge',
			style: {
				'width': 4,
				'target-arrow-shape': 'triangle',
				'line-color': '#9dbaea',
				'target-arrow-color': '#9dbaea'
				}
			}
		],
		elements: {
			nodes: dataNodes,
			edges: nodeEdges
		},
	});
	cy.on('click', 'node', function(evt){
		$('#node-form-options').hide();
		$('#node-form-jump').hide();
		$('#node-form-stats').hide();
		clearNodeForm();
		
		var node = evt.cyTarget;
		$('#node-form-id').val(node.id());
		
		$('#node-form-textarea').val(node.data('text'));
		$('#node-form-text').show();
		
		if(node.data('changeStat')){
			$('#node-form-stats-sethealth').val(node.data('changeStat').setHealth);
			$('#node-form-stats-setmoney').val(node.data('changeStat').setMoney);
			
			$('#node-form-stats').show();
		}
		
		if(node.data('options')){
			$('#node-form-options-a-text').val(node.data('options').A.text);
			$('#node-form-options-a-next').val(node.data('options').A.next);
			$('#node-form-options-b-text').val(node.data('options').B.text);
			$('#node-form-options-b-next').val(node.data('options').B.next);
			$('#node-form-options-c-text').val(node.data('options').C.text);
			$('#node-form-options-c-next').val(node.data('options').C.next);
			$('#node-form-options-d-text').val(node.data('options').D.text);
			$('#node-form-options-d-next').val(node.data('options').D.next);
			
			$('#node-form-options').show();
		}
		
		if(node.data('jump')){
			$('#node-form-jump-val').val(node.data('jump'));
			$('#node-form-jump').show();
		}
	});
});

function clearNodeForm(){
	$('#node-form-cynode-id').val("");
	$('#node-form-id').val("");
	$('#node-form-textarea').val("");
	$('#node-form-stats-sethealth').val("");
	$('#node-form-stats-setmoney').val("");
	$('#node-form-options-a-text').val("");
	$('#node-form-options-a-next').val("");
	$('#node-form-options-b-text').val("");
	$('#node-form-options-b-next').val("");
	$('#node-form-options-c-text').val("");
	$('#node-form-options-c-next').val("");
	$('#node-form-options-d-text').val("");
	$('#node-form-options-d-next').val("");
	$('#node-form-jump-val').val("");
};

function hideNodeForm(){
	$('#node-form-text').hide();
	$('#node-form-stats').hide();
	$('#node-form-options').hide();
	$('#node-form-jump').hide();
};

function createNewNode(){
	clearNodeForm();
	$('#node-form-text').show();
	$('#node-form-stats').show();
	$('#node-form-options').show();
	$('#node-form-jump').show();
};

function generateOptionJSONData(){
	return {
				A : {
					text: $('#node-form-options-a-text').val(),
					next: $('#node-form-options-a-next').val()
				},
				B : {
					text: $('#node-form-options-b-text').val(),
					next: $('#node-form-options-b-next').val()
				},
				C : {
					text: $('#node-form-options-c-text').val(),
					next: $('#node-form-options-c-next').val()
				},
				D : {
					text: $('#node-form-options-d-text').val(),
					next: $('#node-form-options-d-next').val()
				}
			};
};

function saveThisNode(){
	var cy = window.cy;
	
	// Adding new node to graph in this case
	if(cy.$('node[id="' + $('#node-form-id').val() +'"]').length == 0){
		var newData = [];
		
		var nodeData = {
				id: $('#node-form-id').val(),
				text: $('#node-form-textarea').val()
		};
		
		var stats = {};
		if ($('#node-form-stats-sethealth').val() != ""){
			stats["setHealth"] = $('#node-form-stats-sethealth').val();
		}
		if ($('#node-form-stats-setmoney').val() != ""){
			stats["setMoney"] = $('#node-form-stats-setmoney').val();
		}
		if (Object.keys(stats).length > 0){
			nodeData['changeStat'] = stats;
		}
		
		if ($('#node-form-jump-val').val() != ""){
			nodeData['jump'] = $('#node-form-jump-val').val();
			
			newData.push({
				group: "edges",
				data:{
					source: $('#node-form-id').val(),
					target: $('#node-form-jump-val').val()
				}
			});
		};
		
		if ($('#node-form-options-a-text').val() != ""){
			var optionChoices = generateOptionJSONData();
			
			newData.push({
				group: "edges",
				data:{
					source: $('#node-form-id').val(),
					target: $('#node-form-options-a-next').val()
				}
			});
			newData.push({
				group: "edges",
				data:{
					source: $('#node-form-id').val(),
					target: $('#node-form-options-b-next').val()
				}
			});
			newData.push({
				group: "edges",
				data:{
					source: $('#node-form-id').val(),
					target: $('#node-form-options-c-next').val()
				}
			});
			newData.push({
				group: "edges",
				data:{
					source: $('#node-form-id').val(),
					target: $('#node-form-options-d-next').val()
				}
			});
			
			nodeData['options'] = optionChoices;
		};
		
		newData.push({ group: "nodes", data: nodeData});
		cy.add(newData);
	};
	
	// This node exists
	if(cy.$('node[id="' + $('#node-form-id').val() +'"]').length == 1){
		var node = cy.$('node[id="' + $('#node-form-id').val() +'"]');
		
		//node.data('id', $('#node-form-id').val());
		node.data('text', $('#node-form-textarea').val());
		
		var stats = {};
		if ($('#node-form-stats-sethealth').val() != ""){
			stats["setHealth"] = $('#node-form-stats-sethealth').val();
		}
		if ($('#node-form-stats-setmoney').val() != ""){
			stats["setMoney"] = $('#node-form-stats-setmoney').val();
		}
		if (Object.keys(stats).length > 0){
			node.data('changeStat', stats);
		}
		
		// Remove all pre-existing edges
		if(cy.$('edge[source="' + $('#node-form-id').val() +'"]').length == 1){
			cy.remove(cy.$('edge[source="' + $('#node-form-id').val() +'"]'));
		}
		node.data('jump', $('#node-form-jump-val').val());
		node.data('options', generateOptionJSONData());
		
		if ($('#node-form-jump-val').val() != ""){
			// Make edge to new jump
			cy.add({
				group: "edges",
				data:{
					source: $('#node-form-id').val(),
					target: $('#node-form-jump-val').val()
				}
			});
		};
		
		if ($('#node-form-options-a-text').val() != ""){
			// Add new edges
			cy.add({
				group: "edges",
				data:{source: $('#node-form-id').val(),
					target: $('#node-form-options-a-next').val()
				}
			});
			cy.add({
				group: "edges",
				data:{source: $('#node-form-id').val(),
					target: $('#node-form-options-b-next').val()
				}
			});
			cy.add({
				group: "edges",
				data:{source: $('#node-form-id').val(),
					target: $('#node-form-options-c-next').val()
				}
			});
			cy.add({
				group: "edges",
				data:{source: $('#node-form-id').val(),
					target: $('#node-form-options-d-next').val()
				}
			});
		};
	}
	
	clearNodeForm();
	hideNodeForm();
};

function deleteNode(){
	if(cy.$('node[id="' + $('#node-form-id').val() +'"]').length == 1){
		var node = cy.$('node[id="' + $('#node-form-id').val() +'"]');
		
		cy.remove(node);
	};
};

function saveToJSON(){
	var allNodes = cy.$('node');
	var nodeRecords = {};
	
	var stages = {};
	for(var index = 0; index < allNodes.length; index++){
		var stage = allNodes[index].id().split(".")[0];
		var stageNode = allNodes[index].id().split(".")[1];
		stages[stage] = "this." + stage;
		
		var tmp = allNodes[index].json().data;
		delete tmp["id"];
		
		if (typeof nodeRecords[stage] === "undefined"){
			nodeRecords[stage] = {};
		}
		nodeRecords[stage][stageNode] = tmp;
	}
	
	var output = "";
	for(records in nodeRecords){
		output += records + '={';
		for(node in nodeRecords[records]){
			output += node+':'+JSON.stringify(nodeRecords[records][node])+',';
		}
		output += '};';
	}
	output += 'stages={';
	for(elm in stages){
		output += '"'+elm+'": '+stages[elm]+',';
	}
	output += '};';
	
	var a = document.createElement("a");
	var file = new Blob([output], {type:'text/plain'});
	a.href = URL.createObjectURL(file);
	a.download = "script.js";
	a.click();
	
};

function rearrangeNodes(){
	cy.elements().layout({ name: 'dagre' });
};